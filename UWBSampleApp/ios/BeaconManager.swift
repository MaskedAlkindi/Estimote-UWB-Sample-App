// CustomEstimoteUWBManager.swift
import Foundation
import React
import EstimoteUWB

@objc(CustomEstimoteUWBManager)
class CustomEstimoteUWBManager: RCTEventEmitter {
    private var uwbManager: EstimoteUWBManager?

    // Initialization and UWB setup
    override init() {
        super.init()
        setupUWB()
    }

    private func setupUWB() {
        self.uwbManager = EstimoteUWBManager(delegate: self, options: EstimoteUWBOptions(shouldHandleConnectivity: true, isCameraAssisted: false))
    }

    @objc func startScanning() {
        self.uwbManager?.startScanning()
    }

    // MARK: RCTEventEmitter
    override func supportedEvents() -> [String]! {
        return ["onDeviceDiscovered", "onDeviceConnected", "onPositionUpdated"]
    }

    @objc static override func moduleName() -> String! {
        return "CustomEstimoteUWBManager"
    }

    @objc static override func requiresMainQueueSetup() -> Bool {
        return true
    }
}

// MARK: EstimoteUWBManagerDelegate
extension CustomEstimoteUWBManager: EstimoteUWBManagerDelegate {
    func didDiscover(device: UWBIdentifiable, with rssi: NSNumber, from manager: EstimoteUWBManager) {
        let deviceInfo = ["id": device.publicIdentifier, "rssi": rssi.stringValue]
        self.sendEvent(withName: "onDeviceDiscovered", body: deviceInfo)
    }

    func didConnect(to device: UWBIdentifiable) {
        let message = "Successfully connected to: \(device.publicIdentifier)"
        self.sendEvent(withName: "onDeviceConnected", body: ["id": device.publicIdentifier, "message": message])
    }

    func didUpdatePosition(for device: EstimoteUWBDevice) {
      let positionInfo = ["id": device.publicIdentifier, "distance": device.distance, "x": device.vector?.x ?? 0, "y": device.vector?.y ?? 0, "z": device.vector?.z ?? 0] as [String : Any]
        self.sendEvent(withName: "onPositionUpdated", body: positionInfo)
    }
}

