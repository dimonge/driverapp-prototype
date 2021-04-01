#! bin/sh
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res


cd android && ./gradlew clean assembleDebug

# Install apk in app

adb -s emulator-5554 install app/build/outputs/apk/debug/app-debug.apk