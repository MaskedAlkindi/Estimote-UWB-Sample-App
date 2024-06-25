# Estimote UWB SDK for React Native

Welcome to the GitHub repository for the Estimote UWB SDK adapted for React Native. This repository hosts a sample Expo application that bridges the latest Estimote UWB beacon SDK with React Native, facilitating easy development and integration.

# This Project
## Supported Platforms

| Platform       | Supported       |
| -------------- | --------------- |
| 🍎 Apple       | ✅              |
| 🤖 Android     | ✅              |



## Tested Platforms

| Platform       | Tested       |
| -------------- | --------------- |
| 🍎 Apple       | ✅              |
| 🤖 Android     | ❌              |


### Platform Compatibility Note
The Android version was not tested due to limitations in UWB technology support. Unfortunately, I did not have access to an Android device that supports UWB technology. However, I was able to test on the latest compatible Apple device, the iPhone 11.

According the offical IOS UWB SDK Documentation about compatible apple devices

"UWB-enabled iPhones *(iPhone 11 to iPhone 14 with U1 chip or iPhone 15 and newer with 2nd-gen UWB chip).* It leverages the Core Bluetooth API and the Nearby Interactions API to discover, connect to, and range between UWB-enabled iPhones and beacons."


## Getting Started
This project uses Expo's prebuild configuration. To get started, you need to have an account on [Expo](https://expo.dev).

### Installation Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Update bundle identifiers in `app.json`:**
   ```json
   "ios": {
     "supportsTablet": true,
     "bundleIdentifier": "com.UWBSampleApp.appy"
   },
   "android": {
     "adaptiveIcon": {
       "foregroundImage": "./assets/adaptive-icon.png",
       "backgroundColor": "#ffffff"
     },
     "package": "com.UWBSampleApp.appy"
   }
   ```

   **Note for iOS:** You are required to have an Apple developer account and register the identifier in the Apple Developer Portal.

3. **Create a development build with Expo Application Services (EAS):**
   - For Android:
     ```bash
     eas build --profile development --platform android
     ```
   - For iOS:
     ```bash
     eas build --profile development --platform ios
     ```
     Note: You might encounter a dependency conflict with CocoaPods. To resolve this, use Xcode for building. Navigate to the iOS directory, run `pod install`, and if needed, fix dependency names with:
     ```bash
     grep -rl "s.dependency 'React/Core'" node_modules/ | xargs sed -i '' 's=React/Core=React-Core=g'
     ```

4. **Launch the application:**
   - Open the `.xcworkspace` in Xcode, connect your Apple device, and adjust the development team and bundle identifier settings in Signing & Capabilities.
   - After installing the build on your device, open a terminal and run:
     ```bash
     npx expo start
     ```
   - Scan the QR code within your build to start the application.

   For Android, the procedure is similar post-build creation. Visit [Expo Dev](https://expo.dev) to download your development build, run the above command in your terminal or Command Prompt, and scan the QR code to launch the app.

5. **Data and Reading UWB Beacons:**
- After the application as launched you will see data about the nearby uwb beacons nearby in the terminal.

## About Estimote UWB Beacons
Estimote UWB beacons are known for their precise positioning capabilities. This is the first integration of UWB beacons with React Native to my knowledge. While the SDK provides robust features, there are currently a few limitations, such as lack of beacon authentication.

For more details and updates on the SDK, visit Estimote's GitHub pages:
- [Android Estimote UWB SDK](https://github.com/Estimote/Android-Estimote-UWB-SDK)
- [iOS Estimote UWB SDK](https://github.com/Estimote/iOS-Estimote-UWB-SDK)

You can also find the latest sample apps for native Android and iOS development on these pages.

## Contributions
Contributions to this project are welcome. Feel free to utilize this application or the GitHub repository as outlined under the MIT License.


## Special thanks 

Special thanks to Miss Nusaiba Al Sulaimani Lecturer in the German University of Technology in Oman providing the opportunity to work on this project and allowing to borrow the Uwb Beacons for development.


