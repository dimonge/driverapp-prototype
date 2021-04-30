import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Flag} from 'react-native-svg-flagkit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {MDSubheading} from '../../../components/Text/Text';
import {FLAGS_AND_CODES} from '../../../constants/flagsAndCodes';
import {COLORS} from '../../../Themes';

function FlagView({flag, showIcon}) {
  const flagCode = FLAGS_AND_CODES[flag];
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {flagCode.icon}
      {showIcon && (
        <Icon name="chevron-down" size={20} color={COLORS.disabled} />
      )}
      <View style={{marginLeft: 10, marginRight: 10}}>
        <MDSubheading>{flagCode.numberCode}</MDSubheading>
      </View>
    </View>
  );
}

FlagView.propTypes = {
  flag: PropTypes.string,
  showIcon: PropTypes.bool,
};

FlagView.defaultProps = {
  flag: FLAGS_AND_CODES.FI.code,
  showIcon: false,
};

export default FlagView;
