import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {inject, observer} from 'mobx-react';
import i18n from 'i18n-js';

import {Card, Container, Content, List, ListItem, Text} from 'native-base';

import DeliveryItem from './DeliveryItem';
import {COLORS as Colors} from '../../Themes';

const DeliveryListScreen = ({deliveries}) => {
  function onAccept(delivery) {
    onPostAccept({...delivery, supplierId: userId});
  }

  function onReject(delivery) {
    onPostReject(delivery);
  }
  const item = delivery => {
    return (
      <Card>
        <DeliveryItem
          delivery={delivery}
          onAccept={() => onAccept(delivery)}
          onReject={() => onReject(delivery)}
        />
      </Card>
    );
  };
  const totalDeliveries = !!deliveries
    ? `${i18n.t('labelYouhave')} ${deliveries.length} ${i18n.t(
        'labelRequests',
      )}`
    : null;
  return (
    <Container>
      <Content>
        <List style={styles.list}>
          <ListItem>
            <Text>{totalDeliveries}</Text>
          </ListItem>
        </List>
        {!!deliveries && deliveries.length ? (
          deliveries.map(delivery => {
            return item(delivery);
          })
        ) : (
          <View
            style={{
              flex: 0,
              flexDirection: 'column',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text>No deliveries</Text>
          </View>
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  list: {backgroundColor: Colors.secondary},
});
export default inject('store')(observer(DeliveryListScreen));
