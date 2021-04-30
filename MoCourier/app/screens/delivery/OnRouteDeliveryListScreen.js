import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import DeliveryListScreen from './DeliveryListScreen';
import {inject, observer} from 'mobx-react';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

function OnRouteDeliveryListScreen({
  store: {
    delivery: {
      isLoadingOnRouteDeliveries,
      getOnRouteDeliveries,
      getOnRouteDeliveriesList,
    },
  },
}) {
  useEffect(() => {
    getOnRouteDeliveries();
  }, []);

  if (isLoadingOnRouteDeliveries) {
    return <LoadingIndicator />;
  }

  return <DeliveryListScreen deliveries={getOnRouteDeliveriesList} />;
}

OnRouteDeliveryListScreen.propTypes = {
  store: PropTypes.object.isRequired,
};

export default inject('store')(observer(OnRouteDeliveryListScreen));
