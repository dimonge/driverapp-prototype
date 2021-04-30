import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {View} from 'native-base';
import {Text} from 'react-native';
import ProfileImage from '../../components/Avatar/ProfileImage';
import {Subheading, Button, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

export default function DrawerContent(props) {
  console.log('PROPS', props);
  return (
    <DrawerContentScrollView {...props}>
      <View style={{flex: 1, paddingLeft: 25, paddingTop: 25}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 25,
          }}>
          <ProfileImage size={80} />
          <View style={{paddingLeft: 20}}>
            <Subheading>Peter Shodeinde</Subheading>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingBottom: 20,
          }}>
          <View style={{alignItems: 'center'}}>
            <Icon name="car" size={20} />
          </View>
          <Subheading>20 total deliveries</Subheading>
        </View>
      </View>
      <Divider />
      <View style={{paddingBottom: 40}} />
      <DrawerItemList {...props} />
      <DrawerItem
        label={() => <Text>Log out</Text>}
        icon={({focused, color, size}) => <Icon name="logout" size={20} />}
        labelStyle={{marginLeft: 10}}
        onPress={() => console.log('testing...')}
      />
    </DrawerContentScrollView>
  );
}
