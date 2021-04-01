# modeliver-courier-app

Modeliver Courier app React native app for IOS and Android.

keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android

TODO:

- Send the courier location via socket io to the Dispatch Database and the manager and customer can track the current location.
- Create an higher order components which provides a reusable components for the both the driver and the customer app

- JSON schema builder
  https://github.com/royaizenberg/react-native-jsonschema-form

## Upgrade instructions

Automated upgrade steps complete.
...but this doesn't mean everything is done yet!

The following packages were updated:
jest-expo, react-native, react, babel-preset-expo, expo

The following packages were not updated. You should check the READMEs for those repositories to determine what version is compatible with your new set of packages:
@expo/samples, @mapbox/polyline, i18n-js, immutable, lodash, prop-types, re-reselect, react-native-paper, react-navigation, react-navigation-redux-helpers, react-redux, redux, redux-logger, redux-persist, redux-saga, reselect, sharp-cli, socket.io-client, @redux-saga/testing-utils, enzyme, prettier

Please refer to the release notes for information on any further required steps to update and information about breaking changes:
https://blog.expo.io/expo-sdk-35-is-now-available-beee0dfafbf4

In addition to the most recent release notes, you should go over the breaking changes from skipped releases:

- https://blog.expo.io/expo-sdk-34-is-now-available-4f7825239319
- https://blog.expo.io/expo-sdk-v33-0-0-is-now-available-52d1c99dfe4c

## GET DEVICE ID

from expo-device

Device.manufacturer + Device.modelName + Device.deviceYearClass + Device.osName
"Google:Pixel 2:2015:Android"

# Todo

1. Code linting
2. CI
3. Code review
4. Snyk protect https://github.com/snyk/snyk

## Articles

Real time tracking

- https://www.pubnub.com/blog/realtime-geo-tracking-app-react-native/

Messaging

- https://www.pubnub.com/blog/building-a-chat-app-with-react-native-and-pubnub-part-one-messaging/

https://www.pubnub.com/docs/react-native-javascript/api-reference-configuration

## AUTH

- https://invertase.io/oss/react-native-firebase/v6/app/android

Apps
https://onfleet.com/features
https://fleet.postmates.com/
https://fleet.postmates.com/fleet-app/
https://www.google.com/search?q=postmate+fleet+app&sxsrf=ALeKk00lg68oYAE9jKcWkYJRkv1MaP3n_Q:1583172324810&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj4jqfAsPznAhUtxaYKHRdcCKIQ_AUoAXoECA0QAw&biw=2560&bih=949#imgrc=FjSuAYOHtEmO-M

PUBNUB

https://support.pubnub.com/support/solutions/articles/14000043556-can-i-adjust-the-timeout-period-for-presence-

SETUP FOR BETA TESTING AND PRODUCTION

\$ keytool -genkeypair -v -keystore driverapp.keystore -alias driverapp -keyalg RSA -keysize 2048 -validity 10000

https://dev.to/shubhkirtisharma/building-serverless-or-debug-apk-for-react-native-apps-356m

## Glossary

    - Install apk - `adb -s emulator-5554 install myapp.apk`
    - Run Android emulator with localhost REST - `adb reverse tcp:3001 tcp:3001 (use IP address)`

Setup env config for app
https://github.com/luggit/react-native-config
https://dev.to/calintamas/how-to-manage-staging-and-production-environments-in-a-react-native-app-4naa

## Clear cache

https://gist.github.com/jarretmoses/c2e4786fd342b3444f3bc6beff32098d

## DEPENDENCIES

- https://github.com/crazycodeboy/react-native-splash-screen
  https://github.com/jackmew/react-native-svg-flagkit
  https://github.com/react-native-community/react-native-masked-view (consider this)
  https://github.com/react-navigation/react-navigation (navigations)
  "@react-native-community/netinfo
  https://github.com/react-native-dialogs/react-native-dialogs
  https://github.com/nysamnang/react-native-raw-bottom-sheet
  https://github.com/react-native-community/datetimepicker

https://medium.com/@ansonmathew/automatic-sms-verification-react-native-android-9cf1af1cde53

script
sh sms_retriever_hash.sh --package "com.driverapp" --keystore ./android/app/debug.keystore

Testing code
<#>Welcome to Modriver. Your verification code is: 1234

2216sn4qV9H

https://stackoverflow.com/questions/60430828/how-to-send-sms-programmatically-using-amazon-amplify-sdk-for-my-android-app-use/62373732#62373732
https://techinscribed.com/passwordless-phone-number-authentication-using-aws-amplify-cognito/

# Websocket connectivity

const ws = new Websocket()

function Connection() {

}

module.exports = new Connection()

https://github.com/microsoft/react-native-code-push

## React Native guide

https://github.com/joeyscarim/react-native-guide

https://medium.com/@soksereyphon8/how-to-manage-staging-and-production-env-for-react-native-app-50944138a8e3

https://makeitopen.com/
https://tech.goibibo.com/building-otp-verification-component-in-react-native-with-auto-read-from-sms-2a9a400015b0
https://reactnative.directory/?web=true
https://nozbe.github.io/WatermelonDB/Demo.html
https://aws.amazon.com/blogs/compute/announcing-websocket-apis-in-amazon-api-gateway/
https://medium.com/@kavitanambissan/real-time-updates-in-your-react-app-with-amazon-websocket-api-gateway-aws-lambda-mongodb-6341a4dd57d5
