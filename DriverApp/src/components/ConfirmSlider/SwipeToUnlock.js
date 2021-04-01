import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import i118n from 'i18n-js';
import SwipeButton from 'rn-swipe-button';

const SwipeToUnlock = props => {
  const swipeIcon = () => (
    <Icon name="chevron-circle-right" color="#3b5998" size={60} />
  );

  return (
    <View>
      <SwipeButton
        thumbIconBackgroundColor="#FFFFFF"
        thumbIconComponent={swipeIcon}
        title={props.title}
        titleColor="#FFFFFF"
        height={60}
        {...props}
      />
    </View>
  );
};
SwipeToUnlock.propTypes = {
  title: PropTypes.string,
};
SwipeToUnlock.defaultProps = {
  title: i118n.t('buttonSwipeToGoOnline'),
};
export default SwipeToUnlock;
