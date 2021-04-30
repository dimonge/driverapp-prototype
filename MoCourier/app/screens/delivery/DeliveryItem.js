import React from 'react';
import {StyleSheet} from 'react-native';
import {CardItem, Body, Text, View, Button} from 'native-base';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';

const Address = ({label, value}) => (
  <CardItem bordered>
    <Body>
      <Text style={styles.label}>{label}</Text>
      <Text>{value}</Text>
    </Body>
  </CardItem>
);

const styles = StyleSheet.create({
  label: {color: '#2c8ef4', fontSize: 12},
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rejectButton: {marginRight: 15, paddingLeft: 20, paddingRight: 20},
  acceptButton: {paddingLeft: 20, paddingRight: 20},
});

function DeliveryItem({delivery, onAccept, onReject}) {
  let pickup = '';
  let dropoff = '';
  const store = delivery.storeId;
  if (store) {
    if (store.name) {
      pickup = `${store.name}, `;
    }
    if (store.addressLine1) {
      pickup += store.addressLine1;
    }
  }

  const customer = delivery.customerId;
  if (customer) {
    if (customer.firstName) {
      dropoff = `${customer.firstName}, `;
    }
    if (customer.addressLine1) {
      dropoff += customer.addressLine1;
    }
  }
  // https://reactnativemaster.com/react-native-countdown-timer-example-using-momentjs/
  const countdown = <Text style={{}}>01:00</Text>;
  return (
    <React.Fragment>
      <Address label={i18n.t('DROP_OFF')} value={pickup} />
      <Address label={i18n.t('PICK_UP')} value={dropoff} />
      <CardItem footer>
        <View style={styles.buttonContainer}>
          {countdown}
          <Button style={styles.rejectButton} transparent onPress={onReject}>
            <Text>Reject</Text>
          </Button>
          <Button style={styles.acceptButton} onPress={onAccept}>
            <Text>Accept</Text>
          </Button>
        </View>
      </CardItem>
    </React.Fragment>
  );
}

export default DeliveryItem;
