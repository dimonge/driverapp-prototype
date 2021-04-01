export const API_FIELD_ATTRIBUTES = 'attributes';
export const API_FIELD_EMAIL = 'email';
export const API_FIELD_PHONE_NUMBER = 'phone_number';
export const API_FIELD_PHONE_NUMBER_VERIFIED = 'phone_number_verified';
export const API_FIELD_SUB = 'sub';
export const API_FIELD_FIRST_NAME = 'first_name';
export const API_FIELD_LAST_NAME = 'last_name';
export const API_FIELD_ACCESS_TOKEN = 'accessToken';
export const API_FIELD_USERNAME = 'username';
export const API_FIELD_TOKEN = 'token';

export const getAttributes = data => {
  if (!data) {
    return null;
  }

  return data[API_FIELD_ATTRIBUTES];
};
export const getEmail = attributes => {
  return getData({attributes, field: API_FIELD_EMAIL});
};

export const getData = ({attributes, field}) => {
  if (!attributes) {
    return null;
  }

  return attributes[field];
};

export const getFullName = attributes => {
  const firstName = getFirstName(attributes);
  const lastName = getLastName(attributes);

  let fullName = null;
  if (!!firstName) fullName += firstName + ' ';
  if (!!lastName) fullName += lastName;

  return fullName;
};

export const getFirstName = attributes => {
  return getData({attributes, field: API_FIELD_FIRST_NAME});
};

export const getLastName = attributes => {
  return getData({attributes, field: API_FIELD_LAST_NAME});
};

export const getFullNameAbbr = attributes => {
  const firstName = getFirstName(attributes);
  const lastName = getLastName(attributes);

  let fullNameAbbr = '';
  if (!!firstName) fullNameAbbr += `${firstName[0].toUpperCase()}`;
  if (!!lastName) fullNameAbbr += `${lastName[0].toUpperCase()}`;

  return fullNameAbbr;
};
