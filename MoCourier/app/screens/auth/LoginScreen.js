import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {toJS} from 'mobx';
import {useForm, Controller} from 'react-hook-form';
import i18n from 'i18n-js';
import {observer, inject} from 'mobx-react';

import EmailField from './components/EmailField';
import Header from './components/Header';

import {HelperText, Button, TextInput, BUTTON_TYPE} from '../../components';

import {passwordRules} from '../../services/Constants';

import {FORGOT_PASSWORD} from '../../navigation/nav.constants';
import {COLORS} from '../../Themes';

const LoginScreen = props => {
  const {
    store: {
      user: {isLoggingIn, loginError, onLogin},
    },
  } = props;

  const navigation = useNavigation();
  const {control, handleSubmit, errors} = useForm();

  const [state, setState] = useState({
    error: null,
  });

  useEffect(() => {
    if (loginError) {
      setState({error: loginError});
    }
  }, [loginError]);

  async function _onLoginPress(data) {
    console.log('_onLoginPress', data);
    const {email, password} = data;
    await onLogin(email, password);
  }

  function _onForgotPasswordPress() {
    navigation.navigate(FORGOT_PASSWORD);
  }
  console.log('Errors messages', errors);

  const loginField = (
    <View style={styles.loginContainer}>
      <EmailField
        disabled={isLoggingIn}
        control={control}
        errorValue={errors.email}
      />
      <TextInput
        label={i18n.t('textPassword')}
        helpTextProps={{value: errors.password}}
        name="password"
        textContentType="password"
        disabled={isLoggingIn}
        control={control}
        rules={passwordRules(i18n)}
        secureTextEntry
      />
    </View>
  );
  const loginButton = (
    <Button
      labelStyle={{color: COLORS.white}}
      onPress={handleSubmit(_onLoginPress)}
      isLoading={isLoggingIn}
      disabled={isLoggingIn}>
      {i18n.t('buttonLogin')}
    </Button>
  );
  const loginErrorMessage = (
    <HelperText type="error" visible={!!state.error}>
      {i18n.t('textLoginErrorMessage')}
    </HelperText>
  );
  const forgotPasswordButton = (
    <View style={styles.forgotPasswordContainer}>
      <Button
        type={BUTTON_TYPE.OUTLINED}
        onPress={() => _onForgotPasswordPress()}>
        {i18n.t('buttonForgotPassword')}
      </Button>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={{}}>
        <Header value={i18n.t('headerSignIn')} />
      </View>
      {loginField}
      {!!state.error && loginErrorMessage}
      {loginButton}
      {forgotPasswordButton}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  loginContainer: {
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    marginTop: 20,
  },
});

export default inject('store')(observer(LoginScreen));
