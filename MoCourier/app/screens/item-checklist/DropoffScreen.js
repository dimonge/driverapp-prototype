import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Subheading, Divider, Title} from 'react-native-paper';

import {DELIVERY, CUSTOMER} from '@modeliver_admin/models-util';

import {TabView} from '../../components';
import DropoffOrderItem from './components/DropoffOrderItem';
import DropoffDetails from './components/DropoffDetails';

const ROUTE_TAB = {
  DELIVERY_DETAILS: 0,
  ORDER_DETAILS: 1,
};

function DropoffScreen({t, delivery, onCallConsumer}) {
  const [routeIndex, setRouteIndex] = useState(ROUTE_TAB.DELIVERY_DETAILS);

  const customer = DELIVERY.getCustomer(delivery);
  const customerName = CUSTOMER.fullName(customer);

  const renderHeaderDropOff = (
    <View styles={{justifyContent: 'center'}}>
      <Subheading>{t('headerDropOff')}</Subheading>
      <Title>{customerName}</Title>
    </View>
  );

  function _onPressOrderItem() {
    setRouteIndex(ROUTE_TAB.ORDER_DETAILS);
  }

  const DetailsView = () => (
    <DropoffDetails
      t={t}
      delivery={delivery}
      onPressOrderItem={_onPressOrderItem}
      onCallConsumer={onCallConsumer}
    />
  );

  const orderItems = DELIVERY.getOrderItems(delivery);

  const OrderItem = () => <DropoffOrderItem items={orderItems} />;
  const dropOffTabs = (
    <TabView
      routes={[{key: 'info', title: 'Info'}, {key: 'items', title: 'Items'}]}
      scene={{
        info: DetailsView,
        items: OrderItem,
      }}
      index={routeIndex}
    />
  );
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      {renderHeaderDropOff}
      <Divider />
      {dropOffTabs}
    </View>
  );
}

DropoffScreen.propTypes = {
  t: PropTypes.func.isRequired,
  delivery: PropTypes.object.isRequired,
  onCallConsumer: PropTypes.func.isRequired,
};
export default DropoffScreen;
