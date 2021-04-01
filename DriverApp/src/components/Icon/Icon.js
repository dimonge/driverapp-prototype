import React from 'react';
import PropTypes from 'prop-types';
import AntIcon from 'react-native-vector-icons/AntDesign';

function Icon({name, size}) {
  return <AntIcon name={name} size={size} />;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
};

Icon.defaultProps = {
  size: 20,
};

export default Icon;
