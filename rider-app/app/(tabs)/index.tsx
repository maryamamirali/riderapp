import { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { router } from 'expo-router';
import * as Location from 'expo-location';

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchResult, setSearchResult] = useState();
  const [pickupLocation, setPickupLocation] = useState();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const options = { accuracy: 6, distanceInterval: 0.3 };
      Location.watchPositionAsync(options, (location) => {
        setLocation(location);
      });
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

    fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}&radius=2000`, options)
      .then((response) => response.json())
      .then((response) => setSearchResult(response.results))
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
            <Text style={styles.header}>Select Your pickup Location</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Pickup Location"
          onChangeText={findPickupLocation}
        />
      </View>

      {/* Search Results */}
      {searchResult && !pickupLocation && (
        <ScrollView style={styles.searchResultsContainer}>
          {searchResult.map((item) => (
            <TouchableOpacity
              key={item.fsq_id}
              style={styles.searchResultItem}
              onPress={() => setPickupLocation(item)}
            >
              <Text style={styles.resultText}>{item.name}</Text>
              <Text style={styles.resultAddress}>{item.location.formatted_address}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Selected Pickup Location */}
      {pickupLocation && (
        <View style={styles.selectedLocationContainer}>
          <Text style={styles.selectedLocationText}>
            Pickup Location Selected: {pickupLocation.name}
          </Text>
        </View>
      )}

      {/* Map */}
      {location && (
        <MapView
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={styles.map}
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

      {/* Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: '/dropoff',
              params: {
                name: pickupLocation.name,
                address: pickupLocation.location.formatted_address,
                latitude: pickupLocation.geocodes.main.latitude,
                longitude: pickupLocation.geocodes.main.longitude,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ff5733',
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  searchResultsContainer: {
    maxHeight: 150,
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  searchResultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  resultAddress: {
    fontSize: 14,
    color: '#777',
  },
  selectedLocationContainer: {
    padding: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    marginBottom: 20,
  },
  selectedLocationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  map: {
    width: '100%',
    height: 387,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

