// eslint-disable-next-line import/extensions
import React from 'react';
import {View, Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {List as PaperList, Colors} from 'react-native-paper';
import i18n from 'i18n-js';
import {Provider as PaperProvider} from 'react-native-paper';
import List from '../../src/components/List/List';
import TabView from '../../src/components/Tabs/TabView';
import {Checkbox, CHECKBOX_TYPE} from '../../src/components';

import DeliveryAlert from '../../src/screens/delivery/DeliveryAlert';

import ItemListSliderScreen from '../../src/screens/itemChecklist/ItemListSliderScreen';
import DropoffScreen from '../../src/screens/itemChecklist/DropoffScreen';
import BarChart from '../../src/components/Chart/BarChart';
import ChangeStatusSheet from '../../src/screens/changeStatus/ChangeStatusSheet';
import OrderScreen from '../../src/screens/itemChecklist/OrderScreen';
import OnRouteConfirmation from '../../src/screens/delivery/OnRouteConfirmation';
import {DELIVERY} from '@modeliver_admin/models-util';

storiesOf('Button', module)
  .addDecorator(getStory => <PaperProvider>{getStory()}</PaperProvider>)
  .add('Login screen', () => <LoginScreen />)
  .add('Forget password screen', () => <ForgotPassword />)
  .add('Reset Password message', () => <ResetPasswordMessage />)
  .add('Map screen', () => <MapScreen />)
  .add('Delivery Alert', () => <DeliveryAlert delivery={DELIVERY.sample} />)
  .add('OnRouteConfirmation', () => (
    <OnRouteConfirmation delivery={DELIVERY.sample} />
  ))
  .add('ItemChecklist', () => (
    <ItemListSliderScreen children={<MapScreen />} showSlider />
  ))
  .add('DropoffScreen', () => (
    <DropoffScreen t={value => i18n.t(value)} delivery={DELIVERY.sample} />
  ))
  .add('List sample', () => (
    <List
      data={[{name: 'Oranges', quantity: 2}]}
      renderItem={item => (
        <View>
          <Text>{item.name}</Text>
        </View>
      )}
    />
  ))
  .add('List', () => (
    <List
      data={[
        {name: 'Oranges', quantity: 2, isChecked: 'checked'},
        {name: 'Bread', quantity: 2, isChecked: 'unchecked'},
      ]}
      renderItem={item => (
        <PaperList.Item
          title={`${item.quantity} x ${item.name}`}
          style={{borderBottomWidth: 1, borderColor: Colors.grey300}}
          onPress={() => console.log(item + 'is selected')}
          left={props => <Checkbox status={item.isChecked} />}
        />
      )}
    />
  ))
  .add('BarChart', () => <BarChart />)
  .add('BottomSheet', () => <ChangeStatusSheet />)
  .add('OrderScreen', () => <OrderScreen data={DELIVERY.sample} />)
  .add('Checkbox: Checked', () => <Checkbox status={CHECKBOX_TYPE.CHECKED} />)
  .add('Checkbox: UnChecked', () => (
    <Checkbox status={CHECKBOX_TYPE.UNCHECKED} />
  ))
  .add('TabView', () => (
    <TabView
      scene={{
        first: FirstRoute,
        second: SecondRoute,
      }}
      routes={[
        {key: 'first', title: 'First Tab'},
        {key: 'second', title: 'Second Tab'},
      ]}
    />
  ));

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);
