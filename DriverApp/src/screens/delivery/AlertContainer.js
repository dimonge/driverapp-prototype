import React from 'react';
import {useNavigation} from '@react-navigation/native';
import i18n from 'i18n-js';
import {Content, Card, Header, CardItem, Button, Text} from 'native-base';
import {StyleSheet} from 'react-native';

import {COLORS} from '../../Themes';
import {VIEW_ALL_DELIVERIES} from '../../navigation/nav.constants';

function AlertContainer({children, total}) {
  const navigation = useNavigation();
  function onPress() {
    navigation.navigate(VIEW_ALL_DELIVERIES);
  }

  const showViewAll = total > 1;

  return (
    <Content padder contentContainerStyle={styles.container}>
      <Card>
        <Header style={styles.header}>
          <Text style={styles.headerText}>New order</Text>
        </Header>
        {children}
        {showViewAll ? (
          <CardItem style={styles.footerCard}>
            <Button transparent onPress={onPress}>
              <Text>{`${i18n.t('buttonViewAll')} (${total})`}</Text>
            </Button>
          </CardItem>
        ) : null}
      </Card>
    </Content>
  );
}

AlertContainer.defaultProps = {
  total: 4,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: COLORS.white,
  },
  footerCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AlertContainer;
