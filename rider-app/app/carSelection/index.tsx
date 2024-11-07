import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../../styles/dashboard';
import { router, useLocalSearchParams } from 'expo-router';
import { addRideToDb } from '../config/firebase';

export default function HomeScreen() {
  const [vehicle, setVehicle] = useState(null);
  const [fare, setFare] = useState(null);
  const params = useLocalSearchParams();

  const { pickupLatitude, pickupLongitude, dropOffLatitude, dropOffLongitude, pickupName, dropOffName, pickupAddress, dropOffAddress } = params;

  const rates = {
    bike: 50,
    miniCar: 100,
    acCar: 180,
  };

  const calculateFare = (vehicleType) => {
    const baseFare = rates[vehicleType];
    const distance = calcCrow(pickupLatitude, pickupLongitude, dropOffLatitude, dropOffLongitude);
    const fare = baseFare * distance;
    setFare(Math.round(fare));
    setVehicle(vehicleType);
  };

  // This function calculates the distance between two locations (in km)
  function calcCrow(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Converts numeric degrees to radians
  function toRad(Value) {
    return Value * Math.PI / 180;
  }

  // Request the ride and handle errors
  async function findRide() {
    const ride = {
      pickup: {
        pickupLatitude,
        pickupLongitude,
        pickupAddress,
        pickupName,
      },
      dropOff: {
        dropOffLatitude,
        dropOffLongitude,
        dropOffAddress,
        dropOffName,
      },
      fare,
      vehicle,
      status: 'pending',
    };

    try {
      await addRideToDb(ride);
      Alert.alert('Ride requested successfully!');
    } catch (e) {
      Alert.alert('An error occurred while requesting the ride.');
    }
  }

  return (
    <View style={styles.container}>


      <View style={styles.locationContainer}>
        <Text style={styles.labelText}>Pickup Location: </Text>
        <Text style={styles.locationText}>{pickupName}</Text>
      </View>

      <View style={styles.locationContainer}>
        <Text style={styles.labelText}>Dropoff Location: </Text>
        <Text style={styles.locationText}>{dropOffName}</Text>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.buttonCars} onPress={() => calculateFare('bike')}>
          <Text style={styles.buttonText}>Bike</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCars} onPress={() => calculateFare('miniCar')}>
          <Text style={styles.buttonText}>Mini Car</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCars} onPress={() => calculateFare('acCar')}>
          <Text style={styles.buttonText}>AC Car</Text>
        </TouchableOpacity>
      </View>

      {fare && (
        <View style={styles.fareContainer}>
          <Text style={styles.fareText}>Your total fare is: Rs. {fare}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btn} onPress={findRide}>
          <Text style={styles.buttonText}>Chalo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

