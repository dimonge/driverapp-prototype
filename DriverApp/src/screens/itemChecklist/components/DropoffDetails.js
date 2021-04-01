import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Button, List} from 'react-native-paper';

import {DELIVERY, CUSTOMER, STORE} from '@modeliver_admin/models-util';

import ContactCustomer from './ContactCustomer';
import {get} from 'immutable';

function DropoffDetails({t, delivery, onPressOrderItem, onCallConsumer}) {
  const customer = DELIVERY.getCustomer(delivery);
  const customerName = CUSTOMER.fullName(customer);

  const renderOrderItem = (
    <View style={styles.orderItem}>
      <Button compact mode="outlined" onPress={() => onPressOrderItem()}>
        {t('headerViewOrderItems')}
      </Button>
    </View>
  );

  const store = DELIVERY.getStore(delivery);
  const storeName = STORE.getStoreName(store);
  console.log();
  const renderCustomerInfo = (
    <View>
      <List.Item
        title={get(delivery, DELIVERY.API_FIELD_DESTINATION_COMMENTS)}
        left={() => <List.Icon icon="comment-text" />}
      />
      <List.Item
        title={customerName}
        left={() => <List.Icon icon="account" />}
      />
      <List.Item title={storeName} left={() => <List.Icon icon="cart" />} />
    </View>
  );

  return (
    <View style={styles.container}>
      {renderCustomerInfo}
      {renderOrderItem}
      <ContactCustomer t={t} onCallConsumer={onCallConsumer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column'},
  orderItem: {flex: 1, flexWrap: 'wrap', paddingLeft: 15, paddingRight: 15},
});

export default DropoffDetails;
