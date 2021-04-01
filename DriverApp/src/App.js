/**
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {observer, inject} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';

import {navigationRef} from '@navigation/RootNavigation';
import {LoginStack, HomeStack} from '@navigation/stack';
import {LoadingIndicator} from '@components';
import usePushNotification from '@hooks/usePushNotification';

const Main = (props) => {
  const {
    store: {
      user: {isLoggedIn, isLoading, onIsUserLoggedIn},
    },
  } = props;
  usePushNotification();

  useEffect(() => {
    onIsUserLoggedIn();
  }, []);

  if (isLoading && !isLoggedIn) {
    return <LoadingIndicator />;
  }
  return (
    <NavigationContainer>
      {isLoggedIn ? <LoginStack /> : <LoginStack />}
    </NavigationContainer>
  );
};
export default inject('store')(observer(Main));
