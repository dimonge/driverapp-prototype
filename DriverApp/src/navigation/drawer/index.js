import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeStack, ProfileStack, PaymentStack, SettingStack} from '../stack';
import {HOME, PROFILE, PAYMENT, SETTING} from '../nav.constants';
import DrawerContent from '../../screens/drawer/DrawerContent';
import Icon from 'react-native-vector-icons/AntDesign';

const Drawer = createDrawerNavigator();
export default function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName={HOME}
      drawerContent={props => DrawerContent(props)}>
      <Drawer.Screen
        name={HOME}
        component={HomeStack}
        options={{
          drawerIcon: () => <Icon name="home" size={20} />,
        }}
      />
      <Drawer.Screen
        name={PROFILE}
        component={ProfileStack}
        options={{
          drawerIcon: () => <Icon name="user" size={20} />,
        }}
      />
      <Drawer.Screen
        name={'History'}
        component={PaymentStack}
        options={{
          drawerIcon: () => <Icon name="clockcircleo" size={20} />,
        }}
      />
      <Drawer.Screen
        name={SETTING}
        component={SettingStack}
        options={{
          drawerIcon: () => <Icon name="setting" size={20} />,
        }}
      />
    </Drawer.Navigator>
  );
}
