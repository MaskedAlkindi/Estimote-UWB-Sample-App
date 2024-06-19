import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, DeviceEventEmitter, Alert, Platform, NativeEventEmitter, NativeModules } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { UWBModule, CustomEstimoteUWBManager } = NativeModules;

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
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
    } else if (Platform.OS === 'ios') {
      if (CustomEstimoteUWBManager) {
        const eventEmitter = new NativeEventEmitter(CustomEstimoteUWBManager);

        const discoveredListener = eventEmitter.addListener('onDeviceDiscovered', (deviceInfo) => {
          console.log('Discovered device:', deviceInfo);
        });

        const connectedListener = eventEmitter.addListener('onDeviceConnected', (deviceInfo) => {
          console.log('Connected to device:', deviceInfo);
        });

        const positionUpdatedListener = eventEmitter.addListener('onPositionUpdated', (positionInfo) => {
          console.log('Position updated:', positionInfo);
        });

        CustomEstimoteUWBManager.startScanning();

        return () => {
          discoveredListener.remove();
          connectedListener.remove();
          positionUpdatedListener.remove();
        };
      } else {
        console.error('CustomEstimoteUWBManager is not available.');
      }
    }
  }, []);

  const handleStartScanning = () => {
    if (Platform.OS === 'android') {
      UWBModule.startScanning();
    } else if (Platform.OS === 'ios' && CustomEstimoteUWBManager) {
      CustomEstimoteUWBManager.startScanning();
    }
  };

  const handleStopScanning = () => {
    if (Platform.OS === 'android') {
      UWBModule.stopScanning();
    } else if (Platform.OS === 'ios' && CustomEstimoteUWBManager) {
      CustomEstimoteUWBManager.stopScanning();
    }
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
