//
//    ____  _            _              _   _       ____                        _
//   | __ )| |_   _  ___| |_ ___   ___ | |_| |__   / ___|  ___ __ _ _ __  _ __ (_)_ __   __ _
//   |  _ \| | | | |/ _ \ __/ _ \ / _ \| __| '_ \  \___ \ / __/ _` | '_ \| '_ \| | '_ \ / _` |
//   | |_) | | |_| |  __/ || (_) | (_) | |_| | | |  ___) | (_| (_| | | | | | | | | | | | (_| |
//   |____/|_|\__,_|\___|\__\___/ \___/ \__|_| |_| |____/ \___\__,_|_| |_|_| |_|_|_| |_|\__, |
//                                                                                      |___/
//
//
//  Copyright (c) 2015 Estimote. All rights reserved.

#import <Foundation/Foundation.h>
#import <CoreBluetooth/CoreBluetooth.h>

typedef NS_ENUM(NSInteger, ECOByteDirection) {
    ECOByteDirectionOldYoung,
    ECOByteDirectionYoungOld,
};

// TODO: add headerdoc


/**
 Contains methods related to NSData parsing.
 If possible, use EBSHexStringParser instead.
 */
@interface EBSDataParserUtilities : NSObject

/**
 Convert provided data object to string-encoded hex string. The string is lowercase, with no spaces, i.e.
 {0x01, 0xE2} becomes "01e2". The order of byte characters in string follows the ordering of bytes in data object.
 
 @param data Data to be converted.
 @return Hex string. Nil if provided data is nil. Empty string if data has 0 length.
 */
+ (NSString *)hexStringFromData:(NSData *)data;

+ (NSString *)removeAngleBracketsAndSpacesFromString:(NSString *)string;

+ (NSString *)stringFromHex:(NSString *)hexString
              withHexOffset:(int)offset
          withLengthInBytes:(int)length
              withDirection:(ECOByteDirection)byteDirection;

+ (unsigned)unsignedFromHex:(NSString *)hexString
              withHexOffset:(int)offset
          withLengthInBytes:(int)length
              withDirection:(ECOByteDirection)byteDirection;

+ (NSData *)bytesFromHexString:(NSString *)hexString;

+ (NSString *)stringForAdvertisementData:(NSDictionary *)advertisementData;

+ (NSInteger)protocolVersionFromAdvertisementDataString:(NSString *)advertisementDataString;

+ (NSInteger)frameTypeFromAdvertisementDataString:(NSString *)advertisementDataString
                            indoorProtocolVersion:(NSInteger)indoorProtocolVersion;

+ (NSString *)identifierFromAdvertisementDataString:(NSString *)advertisementDataString
                              indoorProtocolVersion:(NSInteger)indoorProtocolVersion;
@end

