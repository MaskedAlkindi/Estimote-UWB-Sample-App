//
//  BeaconManager.m
//  EstimoteReactNative
//
//  Created by Hajid Alkindi on 12/02/2024.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(CustomEstimoteUWBManager, RCTEventEmitter)

RCT_EXTERN_METHOD(startScanning)

@end

