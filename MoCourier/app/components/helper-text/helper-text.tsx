import React from 'react';
import {HelperText as RNPHelperText} from 'react-native-paper';
import PropTypes from 'prop-types';

function HelperText({children, ...props}) {
  return <RNPHelperText {...props}>{children}</RNPHelperText>;
}

HelperText.propTypes = {
  children: PropTypes.string.isRequired,
};
export default HelperText;
