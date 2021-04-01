import moment from 'moment';

export const computeArrayToMap = (array, key = 'id') => {
  if (array && array.length > 0) {
    return array.reduce((acc, item) => {
      return {...acc, [item[key]]: item};
    }, {});
  } else {
    return {};
  }
};

export const compareDate = (a, b) => {
  if (moment(a.updatedAt).isAfter(b.updatedAt)) {
    return 1;
  } else if (moment(a.updatedAt).isBefore(b.updatedAt)) {
    return -1;
  }
  return 0;
};
