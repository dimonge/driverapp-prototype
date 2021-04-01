import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {TextInput as RNPTextInput} from 'react-native-paper';
import {Controller} from 'react-hook-form';

import HelperText from '../HelperText/HelperText';
import {COLORS as Colors} from '../../Themes';

function TextInput({control, name, rules, helpTextProps, ...props}) {
  const errorMessage = helpTextProps.value && helpTextProps.value.message;
  const isNotValid = !!errorMessage;
  return (
    <View>
      <Controller
        as={
          <RNPTextInput
            style={{backgroundColor: Colors.white}}
            error={isNotValid}
            {...props}
          />
        }
        control={control}
        name={name}
        rules={rules}
        defaultValue=""
        onChange={args => {
          return {
            value: args[0].nativeEvent.text,
          };
        }}
      />
      <HelperText type="error" visible={isNotValid} {...helpTextProps}>
        {errorMessage}
      </HelperText>
    </View>
  );
}

TextInput.propTypes = {
  helpTextProps: PropTypes.object,
};

TextInput.defaultProps = {
  helpTextProps: {value: ''},
};
export default TextInput;
