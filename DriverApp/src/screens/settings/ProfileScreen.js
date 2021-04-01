import React from 'react';
import {View, Text} from 'react-native';
import {Subheading, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {inject, observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';

import {USER} from '@modeliver_admin/models-util';

import ProfileImage from '@components/Avatar/ProfileImage';
import {COLORS} from '@Themes';
import {HOME, VIEW_ALL_DELIVERIES} from '@navigation/nav.constants';

const ProfileScreen = ({
  store: {
    user: {info},
  },
}) => {
  let fullName = null;
  let fullNameAbbreviation = null;
  if (info) {
    const {firstName, lastName} = info;
    fullName = USER.fullName(info);
    fullNameAbbreviation =
      firstName && lastName ? `${firstName[0]}${lastName[0]}` : null;
  }
  const navigation = useNavigation();
  const header = (
    <View
      style={{
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,
        marginBottom: 16,
      }}>
      <TouchableHighlight onPress={() => navigation.navigate(HOME)}>
        <Icon name="close" size={30} color={COLORS.white} />
      </TouchableHighlight>
      <TouchableHighlight>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="questioncircleo" size={16} color={COLORS.white} />
          <Text style={{color: COLORS.white, fontSize: 18, paddingLeft: 5}}>
            Help
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
  const profileHeader = (
    <View
      style={{
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
      }}>
      <ProfileImage
        size={80}
        color={COLORS.white}
        label={fullNameAbbreviation}
      />
      <Subheading style={{color: COLORS.white, marginTop: 16}}>
        {fullName}
      </Subheading>
    </View>
  );

  const menuItems = [
    {
      label: 'Home',
      screen: HOME,
      iconName: 'home',
    },
    {
      label: 'Deliveries',
      screen: VIEW_ALL_DELIVERIES,
      iconName: 'bars',
    },
    {
      label: 'Summary (coming soon)',
      screen: 'Summary',
      iconName: 'filetext1',
    },
    {
      label: 'Notification (coming soon)',
      screen: 'Notification',
      iconName: 'bells',
    },
    {
      label: 'Settings (coming soon)',
      screen: 'Settings',
      iconName: 'setting',
    },
  ];
  const menu = (
    <View style={{flex: 0, flexDirection: 'column', justifyContent: 'center'}}>
      {menuItems.map(item => {
        return (
          <List.Item
            style={{
              paddingLeft: 24,
              paddingTop: 20,
              paddingBottom: 24,
            }}
            key={item.screen}
            title={item.label}
            onPress={() => {
              // TODO: log event
              navigation.navigate(item.screen);
            }}
            left={props => <Icon {...props} size={24} name={item.iconName} />}
          />
        );
      })}
    </View>
  );
  return (
    <View style={{flex: 0, flexDirection: 'column'}}>
      <View style={{backgroundColor: '#282F39'}}>
        {header}
        {profileHeader}
      </View>
      {menu}
    </View>
  );
};

export default inject('store')(observer(ProfileScreen));
