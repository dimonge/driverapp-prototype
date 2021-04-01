import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import DeliveryListScreen from './DeliveryListScreen';
import {inject, observer} from 'mobx-react';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

function PendingDeliveriesScreen({
  store: {
    delivery: {
      isLoadingPendingDeliveries,
      getPendingDeliveries,
      getPendingDeliveriesList,
    },
  },
}) {
  useEffect(() => {
    getPendingDeliveries();
  }, []);

  if (isLoadingPendingDeliveries) {
    return <LoadingIndicator />;
  }

  return <DeliveryListScreen deliveries={getPendingDeliveriesList} />;
}

export default inject('store')(observer(PendingDeliveriesScreen));
