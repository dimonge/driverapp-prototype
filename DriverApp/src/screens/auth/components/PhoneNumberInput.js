import React from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native-paper';

// https://codesandbox.io/s/phone-browser-example-react-o5vt5?file=/src/App.js
// https://github.com/AfterShip/phone
function PhoneNumberInput({label, ...props}) {
  return <TextInput label={label} {...props} />;
}

PhoneNumberInput.propTypes = {
  label: PropTypes.string,
};

PhoneNumberInput.defaultProps = {
  label: '',
};

export default PhoneNumberInput;
