import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
  TouchableHighlight,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {MDTitle, MDText, MDSubheading} from '../../components/Text/Text';
import {COLORS} from '../../Themes';
import RNOtpVerify from 'react-native-otp-verify';
import Authenticator from '../../services/Authenticator';
import {inject, observer} from 'mobx-react';

function OTPVerificationScreen({
  store: {
    user: {onLoginPhoneNumberVerify, isLoggingIn},
  },
  route,
  navigation,
}) {
  const {user, phoneNumber} = route.params;
  const [otp, setOtp] = useState(null);

  const startListeningForOtp = () => {
    if (RNOtpVerify) {
      RNOtpVerify.getOtp()
        .then(p => RNOtpVerify.addListener(otpHandler))
        .catch(p => console.log(p));
    }
  };

  const otpHandler = message => {
    const otp =
      typeof message === 'object' ? /(\d{4})/g.exec(message)[1] : null;
    if (otp) {
      setOtp(otp);
    }
    RNOtpVerify.removeListener();
    Keyboard.dismiss();
  };
  useEffect(() => {
    startListeningForOtp();
    return () => {
      RNOtpVerify.removeListener();
    };
  }, []);

  const onCodeFilled = code => {
    console.log(`Code is ${code}, you are good to go!`);
    onLoginPhoneNumberVerify(user, code);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 20,
        paddingTop: 50,
        paddingRight: 20,
        backgroundColor: COLORS.white,
      }}>
      <View>
        <MDTitle>Verification</MDTitle>
      </View>
      <View>
        <MDSubheading>Enter the 4-digit code sent to you at</MDSubheading>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <MDText style={{textAlign: 'center'}}>{phoneNumber}</MDText>
          <TouchableHighlight
            style={{marginLeft: 5}}
            mode="text"
            onPress={() => {
              navigation.goBack();
            }}>
            <MDText
              style={{
                textAlign: 'center',
                color: COLORS.primary,
                fontSize: 16,
              }}>
              Edit
            </MDText>
          </TouchableHighlight>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <OTPInputView
          pinCount={4}
          style={{width: '80%', height: 100}}
          placeholderTextColor={COLORS.black}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={onCodeFilled}
        />
        <MDText>Resend code in 02:59</MDText>
      </View>
      {isLoggingIn && (
        <ActivityIndicator animating={true} color={COLORS.primary} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 50,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 60,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    color: COLORS.black,
    fontSize: 20,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
    color: COLORS.black,
  },
});
export default inject('store')(observer(OTPVerificationScreen));
