import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {get} from 'immutable';
import i18n from 'i18n-js';

import {DELIVERY, STORE, USER, CUSTOMER} from '@modeliver_admin/models-util';

import {
  Button,
  ProgressBar,
  Avatar,
  Headline,
  Title,
  Subheading,
  Text,
} from 'react-native-paper';
import {Dialog} from '../../components';
import {COLORS as Colors} from '../../Themes';

function OnRouteConfirmation({supplier, delivery, onAccept}) {
  const [visible, setVisible] = useState(true);

  function _onAccept() {
    setVisible(true);
    if (onAccept) {
      const supplierId = USER.getId(supplier);
      onAccept(DELIVERY.setSupplierIdToDelivery({delivery, supplierId}));
    }
  }

  const customer = DELIVERY.getCustomer(delivery);
  const customerName = CUSTOMER.fullName(customer);
  const customerAddress = CUSTOMER.getAddress(customer);
  const distance = get(
    delivery,
    DELIVERY.API_FIELD_ESTIMATED_DROP_OFF_DISTANCE,
  );

  return (
    <Dialog
      title={i18n.t('headerDropOff')}
      content={
        <View>
          <View style={styles.contentHeader}>
            <Avatar.Icon
              style={styles.contentHeaderAvatar}
              size={64}
              icon="account"
            />
            <Title>{customerName}</Title>
            <Text style={styles.text}>{customerAddress}</Text>
            <Text style={styles.text}>{distance}</Text>
          </View>
        </View>
      }
      actions={
        <Button
          mode="contained"
          style={styles.button}
          contentStyle={styles.buttonContent}
          onPress={() => _onAccept()}>
          {i18n.t('buttonAccept')}
        </Button>
      }
    />
  );
}

OnRouteConfirmation.propTypes = {
  delivery: PropTypes.object,
  onAccept: PropTypes.func,
};
const styles = StyleSheet.create({
  contentHeader: {
    alignItems: 'center',
  },
  contentHeaderAvatar: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: Colors.success,
  },
  contentProgressBar: {marginTop: 15},
  progressBar: {height: 20},
  button: {flex: 1, backgroundColor: Colors.success},
  buttonContent: {height: 60},
  text: {fontSize: 20},
});
export default OnRouteConfirmation;
