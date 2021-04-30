import Config from 'react-native-config';

export const REST_URL = Config.REST_URL;

export const UserAsyncStorageKey = 'userinfo';
export const ID_TOKEN = 'idtoken';
export const WS_CONNECTIONS = 'wsconnections';

export const EMAIL_REGEX_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const emailRules = i18n => {
  return {
    required: i18n.t('emailErrorMessage'),
    pattern: {
      value: EMAIL_REGEX_PATTERN,
      message: i18n.t('emailPatternErrorMessage'),
    },
  };
};

export const passwordRules = i18n => {
  return {
    required: i18n.t('passwordErrorMessage'),
    minLength: {
      value: 6,
      message: i18n.t('passwordMinLengthErrorMessage'),
    },
  };
};

// PUBNUB
export const DELIVERY_CHANNEL = 'DELIVERY';
