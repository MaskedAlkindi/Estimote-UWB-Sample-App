
//CustomEstimoteUWBEventEmitter.swift
import Foundation
import React

@objc(CustomEstimoteUWBEventEmitter)
class CustomEstimoteUWBEventEmitter: RCTEventEmitter {
    override func supportedEvents() -> [String]! {
        return ["onDeviceDiscovered", "onDeviceConnected", "onPositionUpdated"]
    }

    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
}

