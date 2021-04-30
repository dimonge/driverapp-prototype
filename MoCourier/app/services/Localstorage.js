import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {UserAsyncStorageKey} from './Constants';

export const set = async (key, value, options) => {
  try {
    if (!options) {
      options = {accessible: ACCESSIBLE.WHEN_UNLOCKED};
    }
    return await RNSecureStorage.set(key, value, options);
  } catch (error) {
    throw error;
  }
};

export const get = async key => {
  try {
    const data = await RNSecureStorage.get(key);
    return data;
  } catch (error) {
    throw error;
  }
};

export const removeData = async key => {
  try {
    await RNSecureStorage.remove(key);
  } catch (error) {
    throw error;
  }
};

export const getUserFromStorage = async () => {
  try {
    const user = await get(UserAsyncStorageKey);
    if (!!user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const getDeviceId = async () => {
  const user = await getUserFromStorage();

  if (!!user) {
    return user.deviceId;
  } else {
    return null;
  }
};

export const isExist = async key => {
  try {
    const value = await RNSecureStorage.exists(key);
    return value;
  } catch (error) {
    console.log(error);
    return null;
  }
};
