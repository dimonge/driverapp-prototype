import React from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight} from 'react-native';
import {Button} from 'react-native-paper';

export const CHECKBOX_TYPE = {
  CHECKED: 'CHECKED',
  UNCHECKED: 'UNCHECKED',
};

function Circle({type}) {
  let styles = {
    width: 60,
    height: 60,
  };
  let icon = '';
  if (type === CHECKBOX_TYPE.CHECKED) {
    icon = 'checkbox-marked-circle';
  } else if (type === CHECKBOX_TYPE.UNCHECKED) {
    icon = 'checkbox-blank-circle-outline';
  }
  return <Button contentStyle={{...styles}} icon={icon} />;
}

function Checkbox({status, onPress}) {
  if (onPress) {
    return (
      <TouchableHighlight onPress={() => onPress()}>
        <Circle type={status} />
      </TouchableHighlight>
    );
  }
  return <Circle type={status} />;
}

Checkbox.propTypes = {
  status: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

Checkbox.defaultProps = {
  onPress: null,
};

export default Checkbox;
