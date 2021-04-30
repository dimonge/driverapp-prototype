import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';

import {TextInput} from '../../../components';
import {emailRules} from '../../../services/Constants';

function EmailField({control, errorValue, ...props}) {
  return (
    <TextInput
      label={i18n.t('textEmail')}
      helpTextProps={{value: errorValue}}
      mode="flat"
      name="email"
      control={control}
      rules={emailRules(i18n)}
      {...props}
    />
  );
}

EmailField.propTypes = {
  control: PropTypes.object.isRequired,
  errorValue: PropTypes.object.isRequired,
};

export default EmailField;
