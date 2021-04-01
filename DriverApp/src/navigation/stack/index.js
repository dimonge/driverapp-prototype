import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'native-base';

import {
  LOGIN,
  FORGOT_PASSWORD,
  HOME,
  SETTING,
  PROFILE,
  PAYMENT,
  VIEW_ALL_DELIVERIES,
  PENDING_DELIVERIES,
  ONGOING_DELIVERIES,
  LOGIN_HOME,
  LOGIN_WITH_PHONE_NUMBER,
  LOGIN_OTP,
} from '../nav.constants';

import LoginScreen from '../../screens/auth/LoginScreen';
import ForgotPasswordScreen from '../../screens/auth/ForgotPassword';
import HomeScreen from '../../screens/HomeScreen';
import SettingScreen from '../../screens/settings/SettingScreen';
import ProfileScreen from '../../screens/settings/ProfileScreen';
import PaymentScreen from '../../screens/settings/PaymentScreen';
import {inject, observer} from 'mobx-react';
import i18n from 'i18n-js';

import DeliveryListScreen from '../../screens/delivery/DeliveryListScreen';
import {View, Platform} from 'react-native';
import {Button, Avatar} from 'react-native-paper';
import {COLORS} from '../../Themes';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PendingDeliveryScreen from '../../screens/delivery/PendingDeliveryScreen';
import OnRouteDeliveryListScreen from '../../screens/delivery/OnRouteDeliveryListScreen';
import Header from '../../screens/home/Header';
import PhoneLoginScreen from '../../screens/auth/PhoneLoginScreen';
import LoginHomeScreen from '../../screens/auth/LoginHomeScreen';
import OTPVerificationScreen from '../../screens/auth/OTPVerificationScreen';
import {NavigationContainer} from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

export const LoginStack = () => (
  <Stack.Navigator initialRouteName={LOGIN_HOME}>
    <Stack.Screen
      options={{
        title: '',
      }}
      name={LOGIN_WITH_PHONE_NUMBER}
      component={PhoneLoginScreen}
    />
    <Stack.Screen
      headerMode="none"
      options={{
        header: () => null,
      }}
      name={LOGIN_HOME}
      component={LoginHomeScreen}
      headerShown={false}
    />
    <Stack.Screen
      headerMode="float"
      options={{
        title: '',
      }}
      name={LOGIN_OTP}
      component={OTPVerificationScreen}
    />
  </Stack.Navigator>
);
export const DeliveryTab = () => (
  <Tab.Navigator>
    <Tab.Screen
      options={{title: 'Pending'}}
      name={PENDING_DELIVERIES}
      component={PendingDeliveryScreen}
    />
    <Tab.Screen
      options={{title: 'On going'}}
      name={ONGOING_DELIVERIES}
      component={OnRouteDeliveryListScreen}
    />
  </Tab.Navigator>
);
export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HOME}
        component={HomeScreen}
        options={{
          headerTransparent: true,
          header: () => {
            return <Header />;
          },
        }}
      />
      <Stack.Screen
        name={VIEW_ALL_DELIVERIES}
        component={DeliveryTab}
        options={() => ({
          title: i18n.t('headerDeliveryRequest'),
        })}
      />

      <Stack.Screen
        name={PROFILE}
        component={ProfileScreen}
        options={{
          headerShown: false,
          headerMode: 'screen',
        }}
      />
    </Stack.Navigator>
  );
};

export const SettingStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={SETTING}
      component={SettingScreen}
      options={({navigation, route}) => ({
        title: 'Settings',
        headerLeft: () => (
          <Button
            transparent
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Icon name="menu" />
          </Button>
        ),
      })}
    />
  </Stack.Navigator>
);

export const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={PROFILE} component={ProfileScreen} />
  </Stack.Navigator>
);

export const PaymentStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={PAYMENT}
      component={PaymentScreen}
      options={({navigation}) => ({
        title: 'History',
        headerLeft: () => (
          <Button
            transparent
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Icon name="menu" />
          </Button>
        ),
      })}
    />
  </Stack.Navigator>
);
