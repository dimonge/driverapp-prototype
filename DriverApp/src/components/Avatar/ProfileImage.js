import React from 'react';
import PropTypes from 'prop-types';

import {Avatar} from 'react-native-paper';
import {COLORS} from '../../Themes';

function ProfileImage({size, uri, color, label}) {
  if (!uri) {
    return <Avatar.Text size={size} label={label} color={color} />;
  }
  return <Avatar.Image size={size} source={{uri: uri}} />;
}

ProfileImage.propTypes = {
  size: PropTypes.number,
  uri: PropTypes.string,
  color: PropTypes.string,
  label: PropTypes.string,
};

ProfileImage.defaultProps = {
  size: 24,
  uri: null,
  color: COLORS.primary,
  label: '',
};
export default ProfileImage;
