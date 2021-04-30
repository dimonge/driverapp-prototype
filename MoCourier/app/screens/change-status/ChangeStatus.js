import React from 'react';
import PropTypes from 'prop-types';
import {View, Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../Themes';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {t} from 'i18n-js';
import CustomDialog from '../../components/Dialog/Dialog';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
function ChangeStatus({
  info: {isOnline: status},

  isChangingStatus,
  onPressCurrentLocation,
  onStatusChangePress,
}) {
  const shadowProps =
    Platform.OS === 'ios'
      ? {
          shadowOffset: {height: 72, width},
          shadowOpacity: 15,
          shadowColor: COLORS.grey,
        }
      : {elevation: 20};
  const statusButtonText = status ? t('buttonStop') : t('buttonGo');
  const statusButtonStyle = status
    ? {
        backgroundColor: COLORS.errorBackground,
      }
    : {
        backgroundColor: COLORS.primary,
      };
  const _onCurrentLocationPress = () => {
    // TODO: log event
    if (onPressCurrentLocation) {
      onPressCurrentLocation();
    }
  };

  const _onStatusChangePress = () => {
    // TODO: log event
    if (onStatusChangePress) {
      onStatusChangePress(!status);
    }
  };
  let renderLoadingDialog = null;

  if (isChangingStatus) {
    renderLoadingDialog = <CustomDialog content={<LoadingIndicator />} />;
  }
  return (
    <View style={Styles.container}>
      <View style={{flex: 1}} />
      <View style={{flex: 2}}>
        <TouchableHighlight
          underlayColor={status ? COLORS.errorBackground : COLORS.primary}
          style={{
            ...Styles.statusButtonStyle,
            ...shadowProps,
            ...statusButtonStyle,
          }}
          onPress={_onStatusChangePress}>
          <View
            style={{
              ...Styles.statusStyle,
              ...statusButtonStyle,
            }}>
            <Text
              style={{
                fontSize: status ? 14 : 22,
                ...Styles.statusTextStyle,
              }}>
              {statusButtonText}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={Styles.locationIconContainer}>
        <TouchableHighlight
          underlayColor={COLORS.grey}
          style={{
            ...Styles.locationIconButton,
            ...shadowProps,
          }}
          onPress={_onCurrentLocationPress}>
          <Icon name="crosshairs-gps" size={30} color={COLORS.black} />
        </TouchableHighlight>
      </View>
      {renderLoadingDialog}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-between',
    marginBottom: 16,
    marginRight: 16,
    marginLeft: 16,
  },
  locationIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  locationIconButton: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusButtonStyle: {
    height: 72,
    width: 72,
    borderRadius: 36,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  statusStyle: {
    height: 64,
    width: 64,
    borderRadius: 32,
    borderColor: 'white',
    borderWidth: 1.5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  statusTextStyle: {
    textAlign: 'center',
    color: COLORS.white,
  },
});
ChangeStatus.propTypes = {
  status: PropTypes.bool,
  onPressCurrentLocation: PropTypes.func.isRequired,
  onStatusChangePress: PropTypes.func.isRequired,
};

ChangeStatus.defaultProps = {
  status: false,
};

export default ChangeStatus;
