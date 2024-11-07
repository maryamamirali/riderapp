import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { router, useLocalSearchParams } from 'expo-router';
import styles from '../../styles/dashboard';

import * as Location from 'expo-location';

export default function HomeScreen() {
  const params = useLocalSearchParams();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchResult, setSearchResult] = useState();
  const [dropoffLocation, setDropoffLocation] = useState();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const findPickupLocation = (text) => {
    const { latitude, longitude } = location.coords;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3RSyw7ABZszV88pMBGmsfC7GjrydRY+68g1Ihz7E5tcM=',
      },
    };

    fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}`, options)
      .then((response) => response.json())
      .then((response) => setSearchResult(response.results))
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Your Dropoff Location</Text>

      <View style={styles.dropoffinputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Dropoff Location"
          onChangeText={findPickupLocation}
        />
      </View>

      {/* Search results */}
      {searchResult && !dropoffLocation && (
        <View style={styles.searchResultsContainer}>
          {searchResult.map((item) => {
            return (
              <TouchableOpacity
                key={item.fsq_id}
                style={styles.searchResultItem}
                onPress={() => setDropoffLocation(item)}
              >
                <Text style={styles.resultText}>{item.name}</Text>
                <Text style={styles.resultAddress}>{item.location.formatted_address}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Selected dropoff location */}
      {params && (
        <View style={styles.selectedLocationContainer}>
          <Text style={styles.selectedLocationText}>
            Pickup Location Selected: {params.name}
          </Text>
        </View>
      )}
      {dropoffLocation && (
        <View style={styles.selectedLocationContainer}>
          <Text style={styles.selectedLocationText}>
            Dropoff Location Selected: {dropoffLocation.name}
          </Text>
        </View>
      )}

      {/* Map with marker */}
      {location && (
        <MapView
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={styles.dropoffmap}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={"Your Location"}
            description="Current location"
          />

        </MapView>
      )}

      {/* Button to confirm dropoff */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: '/carSelection',
              params: {
                pickupName: params.name,
                pickupAddress: params.address,
                pickupLatitude: params.latitude,
                pickupLongitude: params.longitude,
                dropOffName: dropoffLocation.name,
                dropOffAddress: dropoffLocation.location.formatted_address,
                dropOffLatitude: dropoffLocation.geocodes.main.latitude,
                dropOffLongitude: dropoffLocation.geocodes.main.longitude,
              },
            })
          }
        >
          <Text style={styles.buttonText}>Select Dropoff</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
