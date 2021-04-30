export const EMAIL_REGEX_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const emailRules = i18n => {
  return {
    required: i18n.t("emailErrorMessage"),
    pattern: {
      value: EMAIL_REGEX_PATTERN,
      message: i18n.t("emailPatternErrorMessage")
    }
  };
};

export const passwordRules = i18n => {
  return {
    required: i18n.t("passwordErrorMessage"),
    minLength: {
      value: 6,
      message: i18n.t("passwordMinLengthErrorMessage")
    }
  };
};
