import React, {useEffect} from 'react';
import OneSignal from 'react-native-onesignal';
import Config from 'react-native-config';

export default function usePushNotification() {
  useEffect(() => {
    OneSignal.setLogLevel(6, 0);

    OneSignal.init(Config.ONE_SIGNAL_APP_ID, {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });

    OneSignal.inFocusDisplaying(2);
    // OneSignal.promptForPushNotificationsWithUserResponse()
    OneSignal.addEventListener('received', onReceived),
      OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    };
  }, []);

  const onReceived = (notification) => {
    console.log('Notification received: ', notification);
  };

  const onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };

  const onIds = (device) => {
    console.log('Device info: ', device);
  };
}
