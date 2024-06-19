package com.UWBSampleApp.appy

import android.Manifest
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.estimote.uwb.api.EstimoteUWBFactory
import com.estimote.uwb.api.scanning.EstimoteUWBScanResult
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class UWBModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityCompat.OnRequestPermissionsResultCallback {
    private val uwbManager = EstimoteUWBFactory.create()
    private val coroutineScope = CoroutineScope(Dispatchers.Main)

    companion object {
        private const val UWB_PERMISSIONS_REQUEST_CODE = 101
    }

    override fun getName(): String {
        return "UWBModule"
    }

    @ReactMethod
    fun initUWB(promise: Promise) {
        if (!hasRequiredPermissions()) {
            requestPermissions()
            promise.reject("PERMISSION_NOT_GRANTED", "Required permissions not granted")
        } else {
            promise.resolve(null)
        }
    }

    private fun hasRequiredPermissions(): Boolean {
        val requiredPermissions = arrayOf(
            Manifest.permission.BLUETOOTH_SCAN,
            Manifest.permission.BLUETOOTH_CONNECT,
            Manifest.permission.UWB_RANGING
        )
        return requiredPermissions.all {
            ContextCompat.checkSelfPermission(reactContext, it) == PackageManager.PERMISSION_GRANTED
        }
    }

    private fun requestPermissions() {
        ActivityCompat.requestPermissions(
            reactContext.currentActivity ?: return,
            arrayOf(
                Manifest.permission.BLUETOOTH_SCAN,
                Manifest.permission.BLUETOOTH_CONNECT,
                Manifest.permission.UWB_RANGING
            ),
            UWB_PERMISSIONS_REQUEST_CODE
        )
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        when (requestCode) {
            UWB_PERMISSIONS_REQUEST_CODE -> {
                if (grantResults.isNotEmpty() && grantResults.all { it == PackageManager.PERMISSION_GRANTED }) {
                    sendEvent("onPermissionGranted", Arguments.createMap().apply {
                        putString("message", "All permissions granted")
                    })
                } else {
                    sendEvent("onPermissionDenied", Arguments.createMap().apply {
                        putString("error", "Permissions denied")
                    })
                }
            }
        }
    }

    @ReactMethod
    fun startScanning() {
        if (!hasRequiredPermissions()) {
            sendEvent("onError", Arguments.createMap().apply {
                putString("error", "Permissions not granted")
            })
            return
        }

        coroutineScope.launch {
            uwbManager.uwbDevices.collect { scanResult: EstimoteUWBScanResult ->
                when (scanResult) {
                    is EstimoteUWBScanResult.Devices -> {
                        scanResult.devices.forEach { device ->
                            val map = Arguments.createMap()
                            map.putString("deviceId", device.deviceId)
                            map.putInt("rssi", device.rssi ?: -1) // Handling null RSSI
                            sendEvent("onDeviceFound", map)
                        }
                    }
                    else -> {
                        sendEvent("onError", Arguments.createMap().apply {
                            putString("error", "No devices found or error occurred")
                        })
                    }
                }
            }
        }
    }

    @ReactMethod
    fun stopScanning() {
        coroutineScope.launch {
            uwbManager.stopDeviceScanning()
        }
    }

    private fun sendEvent(eventName: String, params: WritableMap) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(eventName, params)
    }
}
