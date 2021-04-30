import React from 'react';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import {Icon, ICON_CONSTANT} from '../../components';
import {LAYOUT} from '../../Themes';

function DriverStatus({info: {isOnline: status}}) {
  const statusTitle = status
    ? i18n.t('titleDriverOnlineStatus')
    : i18n.t('titleDriverOfflineStatus');
  return (
    <View>
      <Card style={styles.card}>
        <View style={styles.cardView}>
          <View style={styles.cardIcon}>
            <Icon name={ICON_CONSTANT.ICON_DOWN} size={15} />
          </View>
          <View style={styles.cardContainer}>
            <Card.Title title={statusTitle} style={styles.cardTitle} />
          </View>
          <View style={styles.cardRight} />
        </View>
      </Card>
    </View>
  );
}

DriverStatus.propTypes = {
  status: PropTypes.bool,
};

DriverStatus.defaultProps = {
  status: false,
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    height: 56,
    width: LAYOUT.screen.width,
  },
  cardView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {flex: 1, alignItems: 'center'},
  cardTitle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardContainer: {flex: 2},
  cardRight: {flex: 1},
});
export default DriverStatus;
