import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {inject, observer} from 'mobx-react';

import AlertContainer from './AlertContainer';
import DeliveryItem from './DeliveryItem';
function DeliveryAlert({
  delivery,
  store: {
    delivery: {getDeliveriesSize, postAccept, postReject, getOldestDelivery},
    user: {
      info: {id: userId},
    },
  },
}) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter < 1) {
        setCounter(counter + 0.05);
      }
    }, 1000);
    if (counter === 1) {
      // dispatch to the queue if the driver does not accept the other

      setTimeout(() => {}, 5000);
    }
    return () => clearInterval(interval);
  }, [counter]);

  function onAccept() {
    postAccept({
      ...getOldestDelivery,
      supplierId: userId,
    });
  }

  function onReject() {
    postReject(getOldestDelivery);
  }

  return (
    <AlertContainer total={getDeliveriesSize}>
      <DeliveryItem
        delivery={getOldestDelivery}
        onAccept={onAccept}
        onReject={onReject}
      />
    </AlertContainer>
  );
}

DeliveryAlert.propTypes = {
  delivery: PropTypes.object,
  onAccept: PropTypes.func,
};
const styles = StyleSheet.create({
  contentHeader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentHeaderAvatar: {
    backgroundColor: '#000000',
  },
  contentProgressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-between',
  },
});
export default inject('store')(observer(DeliveryAlert));
