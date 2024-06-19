import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, DeviceEventEmitter, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeModules } from 'react-native';

const { UWBModule } = NativeModules;

export default function App() {
  useEffect(() => {
    UWBModule.initUWB()
      .then(() => {
        console.log('UWB initialized successfully');
      })
      .catch(error => {
        console.error('UWB initialization failed:', error);
      });

    const permissionGrantedListener = DeviceEventEmitter.addListener('onPermissionGranted', (data) => {
      console.log('Permissions granted:', data);
    });

    const permissionDeniedListener = DeviceEventEmitter.addListener('onPermissionDenied', (error) => {
      console.error('Permissions denied:', error);
      Alert.alert('Permission Error', 'Necessary permissions were denied. Please enable them in settings.');
    });

    const deviceFoundListener = DeviceEventEmitter.addListener('onDeviceFound', (data) => {
      console.log('Device found:', data);
    });

    const errorListener = DeviceEventEmitter.addListener('onError', (error) => {
      console.error('Error:', error);
    });

    return () => {
      permissionGrantedListener.remove();
      permissionDeniedListener.remove();
      deviceFoundListener.remove();
      errorListener.remove();
    };
  }, []);

  const handleStartScanning = () => {
    UWBModule.startScanning();
  };

  const handleStopScanning = () => {
    UWBModule.stopScanning();
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="Start Scanning" onPress={handleStartScanning} />
      <Button title="Stop Scanning" onPress={handleStopScanning} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
