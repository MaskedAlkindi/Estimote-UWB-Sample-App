// UWBManagerExample.swift

import Foundation
import EstimoteUWB
import CoreBluetooth
import React // Import React for bridging

@objc(UWBManagerExample)
class UWBManagerExample: RCTEventEmitter {

    // MARK: - Properties
    private var uwbManager: EstimoteUWBManager?
    private var uwbDevices: [String: EstimoteUWBDevice] = [:]

    // MARK: - Initialization
    override init() {
        super.init()
        self.setupUWBManager()
    }

    // MARK: - Setup Estimote UWB Manager
    private func setupUWBManager() {
        let options = EstimoteUWBOptions(shouldHandleConnectivity: true, isCameraAssisted: false)
        self.uwbManager = EstimoteUWBManager(delegate: self, options: options)
        self.uwbManager?.startScanning()
    }

    // MARK: - React Native Event Emitter Setup
    override func supportedEvents() -> [String]! {
        return ["onDeviceDiscovered", "onDeviceConnected", "onDeviceDisconnected", "onPositionUpdated"]
    }

    @objc override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    @objc override static func moduleName() -> String {
        return "UWBManagerExample"
    }
}

// MARK: - EstimoteUWBManagerDelegate Methods
extension UWBManagerExample: EstimoteUWBManagerDelegate {

    func didUpdatePosition(for device: EstimoteUWBDevice) {
        print("Position updated for device: \(device.publicIdentifier), distance: \(device.distance)")
        // Update local devices dictionary
        self.uwbDevices[device.publicIdentifier] = device

        // Emit event to React Native
        let eventBody: [String: Any] = ["id": device.publicIdentifier, "distance": device.distance]
        self.sendEvent(withName: "onPositionUpdated", body: eventBody)
    }

    func uwbManager(_ manager: EstimoteUWBManager, didDiscover device: UWBIdentifiable, with rssi: NSNumber) {
        print("Discovered device: \(device.publicIdentifier) rssi: \(rssi)")
        // Emit event to React Native
        let eventBody: [String: Any] = ["id": device.publicIdentifier, "rssi": rssi]
        self.sendEvent(withName: "onDeviceDiscovered", body: eventBody)
    }

    func uwbManager(_ manager: EstimoteUWBManager, didConnectTo device: UWBIdentifiable) {
        print("Successfully connected to: \(device.publicIdentifier)")
        // Emit event to React Native
        let eventBody: [String: Any] = ["id": device.publicIdentifier]
        self.sendEvent(withName: "onDeviceConnected", body: eventBody)
    }

    func uwbManager(_ manager: EstimoteUWBManager, didFailToConnectTo device: UWBIdentifiable, error: Error?) {
        print("Failed to connect to: \(device.publicIdentifier), error: \(String(describing: error))")
        // Emit event to React Native
        let eventBody: [String: Any] = ["id": device.publicIdentifier, "error": error?.localizedDescription ?? "Unknown error"]
        self.sendEvent(withName: "onDeviceDisconnected", body: eventBody)
    }

    func uwbManager(_ manager: EstimoteUWBManager, didDisconnectFrom device: UWBIdentifiable, error: Error?) {
        print("Disconnected from: \(device.publicIdentifier), error: \(String(describing: error))")
        // Emit event to React Native
        let eventBody: [String: Any] = ["id": device.publicIdentifier]
        self.sendEvent(withName: "onDeviceDisconnected", body: eventBody)
    }
}

// MARK: - React Native Bridging Methods
extension UWBManagerExample {

    @objc func startScanning() {
        self.uwbManager?.startScanning()
    }

    @objc func stopScanning() {
        self.uwbManager?.stopScanning()
    }
}
