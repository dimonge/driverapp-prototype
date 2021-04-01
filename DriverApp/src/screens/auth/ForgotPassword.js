import React from 'react';
import {View, StyleSheet} from 'react-native';
import i18n from 'i18n-js';
import EmailField from './components/EmailField';
import {Button, BUTTON_TYPE} from '../../components';
import Header from './components/Header';
import {useForm} from 'react-hook-form';
import {inject, observer} from 'mobx-react';
import {LOGIN} from '../../navigation/nav.constants';
import {COLORS as Colors} from '../../Themes';

const ForgotPassword = inject('store')(
  observer(props => {
    const {
      navigation,
      store: {
        user: {onForgotPassword},
      },
    } = props;
    const {control, handleSubmit, errors} = useForm();
    function _onSend(data) {
      onForgotPassword(data);
    }
    function _onGoToLoginPagePress() {
      navigation.navigate(LOGIN);
    }
    return (
      <View style={styles.container}>
        <Header value={i18n.t('headerForgotPassword')} />
        <EmailField control={control} errorValue={errors.email} />
        <View style={{marginBottom: 15}}>
          <Button onPress={handleSubmit(_onSend)}>
            {i18n.t('buttonResetPassword')}
          </Button>
        </View>
        <Button type={BUTTON_TYPE.OUTLINED} onPress={_onGoToLoginPagePress}>
          {i18n.t('buttonLogin')}
        </Button>
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingTop: 40,
    paddingRight: 16,
    paddingLeft: 16,
  },
});
export default ForgotPassword;
