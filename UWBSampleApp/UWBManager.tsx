// UWBManager.tsx

import { NativeModules, NativeEventEmitter } from 'react-native';

const { UWBManagerExample } = NativeModules;

const UWBEventEmitter = new NativeEventEmitter(UWBManagerExample);

// Function to start scanning
export const startScanning = () => {
  UWBManagerExample.startScanning();
};

// Function to stop scanning
export const stopScanning = () => {
  UWBManagerExample.stopScanning();
};

// Subscribe to events
const subscriptionDeviceDiscovered = UWBEventEmitter.addListener('onDeviceDiscovered', (event) => {
  console.log('Device discovered:', event);
});

const subscriptionDeviceConnected = UWBEventEmitter.addListener('onDeviceConnected', (event) => {
  console.log('Device connected:', event);
});

const subscriptionDeviceDisconnected = UWBEventEmitter.addListener('onDeviceDisconnected', (event) => {
  console.log('Device disconnected:', event);
});

const subscriptionPositionUpdated = UWBEventEmitter.addListener('onPositionUpdated', (event) => {
  console.log('Position updated:', event);
});

// Export necessary functions and subscriptions
export default {
  startScanning,
  stopScanning,
  subscriptions: {
    deviceDiscovered: subscriptionDeviceDiscovered,
    deviceConnected: subscriptionDeviceConnected,
    deviceDisconnected: subscriptionDeviceDisconnected,
    positionUpdated: subscriptionPositionUpdated,
  },
};
