import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, Alert, DeviceEventEmitter, Platform, NativeEventEmitter, NativeModules } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import UWBManager from './UWBManager'; // Adjust the path as necessary

const { UWBModule } = NativeModules;

export default function App() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const updateDeviceList = (data) => {
      setDevices(prevDevices => {
        const index = prevDevices.findIndex(device => device.id === data.id);
        if (index > -1) {
          prevDevices[index] = data; // Update existing device
          return [...prevDevices];
        } else {
          return [...prevDevices, data]; // Add new device
        }
      });
    };

    const deviceListener = DeviceEventEmitter.addListener('onPositionUpdated', (event) => {
      updateDeviceList({ id: event.id, distance: event.distance });
    });

    if (Platform.OS === 'android') {
      UWBModule.initUWB()
        .then(() => {
          console.log('UWB initialized successfully');
        })
        .catch(error => {
          console.error('UWB initialization failed:', error);
          Alert.alert('Initialization Error', 'UWB initialization failed. Please check the console for more details.');
        });
    } else if (Platform.OS === 'ios') {
      UWBManager.startScanning();
    }

    return () => {
      deviceListener.remove();
      if (Platform.OS === 'ios') {
        UWBManager.stopScanning();
      }
    };
  }, []);

  const handleStartScanning = () => {
    if (Platform.OS === 'android') {
      UWBModule.startScanning();
    } else if (Platform.OS === 'ios') {
      UWBManager.startScanning();
    }
  };

  const handleStopScanning = () => {
    if (Platform.OS === 'android') {
      UWBModule.stopScanning();
    } else if (Platform.OS === 'ios') {
      UWBManager.stopScanning();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Beacon Scanner</Text>
      <View style={styles.buttonContainer}>
        <Button title="Start Scanning" onPress={handleStartScanning} color="#4CAF50" />
        <Button title="Stop Scanning" onPress={handleStopScanning} color="#f44336" />
      </View>
      <ScrollView style={styles.listContainer}>
        {devices.map((device, index) => (
          <View key={index} style={styles.listItem}>
            <Image source={require('./Beacon.png')} style={styles.beaconImage} />
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>ID: {device.id}</Text>
              <Text style={styles.infoText}>Distance: {device.distance.toFixed(3)} m</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  listContainer: {
    width: '100%',
  },
  listItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  beaconImage: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: 18,
  },
});



