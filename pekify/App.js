/**
 * Created by InspireUI on 18/02/2017.
 *
 * @format
 */

import React, { Component } from "react";
import { I18nManager } from "react-native";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import OneSignal from "react-native-onesignal";
import { AdMobInterstitial } from "react-native-admob";

import { Config } from "@common";
import { getNotification } from "@app/Omni";
import store from "@store/configureStore";
import Router from "./src/Router";

export default class ReduxWrapper extends Component {
  constructor(props) {
    super(props);

    OneSignal.init(Config.OneSignal.appId);
  }

  componentWillMount() {
    if (Config.showAdmobAds) {
      AdMobInterstitial.setAdUnitID(Config.AdMob.interstitial);
      if (__DEV__) {
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
      }
      AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }
  }

  async componentDidMount() {
    const notification = await getNotification();

    if (notification) {
      // NOTE: check if removeEventListener should be in the componentDidMount
      OneSignal.removeEventListener("opened", this.onOpened);
      OneSignal.addEventListener("received", this.onReceived);
      OneSignal.addEventListener("ids", this.onIds);
    }
    console.disableYellowBox = true;
    console.ignoredYellowBox = ["Warning: View.propTypes", "Warning: BackAndroid"];
  }

  async componentWillUnmount() {
    const notification = await getNotification();

    if (notification) {
      OneSignal.removeEventListener("opened", this.onOpened);
      OneSignal.removeEventListener("received", this.onReceived);
      OneSignal.removeEventListener("ids", this.onIds);
    }
  }

  onReceived = notification => {
    console.log("Notification received: ", notification);
  };

  onOpened = openResult => {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  };

  onIds = device => {
    console.log("Device info: ", device);
  };

  render() {
    const persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}
