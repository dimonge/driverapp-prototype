import React from 'react';
import PropTypes from 'prop-types';
import {Button as RNPButton, ActivityIndicator} from 'react-native-paper';
import {COLORS as Colors, COLORS} from '../../Themes';

export const BUTTON_TYPE = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
};
function Button({
  style,
  contentStyle,
  labelStyle,
  mode,
  type,
  children,
  isLoading,
  disabled,
  ...props
}) {
  return (
    <RNPButton
      style={{borderRadius: 17, ...style}}
      labelStyle={{
        color: type === BUTTON_TYPE.FILLED ? Colors.white : '#3DB24B',
        ...labelStyle,
      }}
      contentStyle={{
        height: 40,
        backgroundColor:
          type === BUTTON_TYPE.FILLED
            ? '#3DB24B'
            : disabled
            ? Colors.grey
            : Colors.white,
        ...contentStyle,
      }}
      mode={mode}
      full
      disabled={disabled}
      loading={isLoading}
      {...props}>
      {children}
    </RNPButton>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  style: PropTypes.object,
  contentStyle: PropTypes.object,
  mode: PropTypes.string,
  type: PropTypes.oneOf(['filled', 'outlined']),
  labelStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  isLoading: false,
  style: {},
  contentStyle: {},
  labelStyle: {},
  mode: 'text',
  type: 'filled',
  disabled: false,
};
export default Button;
