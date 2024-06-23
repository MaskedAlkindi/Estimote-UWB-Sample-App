//
// UWBManagerExample.m
//  UWBSampleApp
//
//  Created by MaskedAlkindi on 6/23/24.
//

#import <Foundation/Foundation.h>



#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(UWBManagerExample, RCTEventEmitter)

RCT_EXTERN_METHOD(startScanning)
RCT_EXTERN_METHOD(stopScanning)

@end


