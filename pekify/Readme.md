Generate debug keystore
keytool -genkey -v -keystore app.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000

Generate production keystore

Articles
https://docs.inspireui.com/mstore/facebook-setting/

- how to rename package name
  https://saumya.github.io/ray/articles/72/

- Woocommerce Rest API
  https://docs.woocommerce.com/document/woocommerce-rest-api/

- Publishing to Google Play Store
  https://reactnative.dev/docs/signed-apk-android#docsNav

Setup needed.

- https://app.onesignal.com/apps
- https://www.mobilepay.fi/

How to package app

https://dev.to/shubhkirtisharma/building-serverless-or-debug-apk-for-react-native-apps-356m

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
