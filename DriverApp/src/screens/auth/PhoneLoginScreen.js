import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, SafeAreaView, Linking, Alert} from 'react-native';
import PhoneNumberInput from './components/PhoneNumberInput';
import {MDHeadline, MDText} from '../../components/Text/Text';
import {COLORS} from '../../Themes';
import Button from '../../components/Button/Button';
import {TouchableHighlight} from 'react-native-gesture-handler';
import FlagView from './components/FlagView';
import {FLAGS_AND_CODES} from '../../constants/flagsAndCodes';
import {useNavigation} from '@react-navigation/native';
import {LOGIN_OTP} from '../../navigation/nav.constants';
import Hyperlink from 'react-native-hyperlink';
import RNOtpVerify from 'react-native-otp-verify';
import Authenticator from '../../services/Authenticator';

function PhoneLoginScreen() {
  const [flag, setFlag] = useState('FI');
  const [phoneNumber, setPhoneNumber] = useState(null);

  const navigator = useNavigation();

  // for generating the otp code to send with the SMS api
  const getHash = () => {
    if (RNOtpVerify) {
      RNOtpVerify.getHash().then(console.log).catch(console.log);
    }
  };

  const onContinuePress = async () => {
    let user;
    const code = FLAGS_AND_CODES[flag].numberCode;
    const phoneNumberWithCode = `${code}${phoneNumber}`;
    try {
      user = await Authenticator.signIn(phoneNumberWithCode);
    } catch (error) {
      console.log(error);
    }
    navigator.navigate(LOGIN_OTP, {user, phoneNumber: phoneNumberWithCode});
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View style={{marginRight: 20, marginLeft: 20, marginTop: 50}}>
        <View style={{marginBottom: 30}}>
          <MDHeadline style={{fontWeight: 'bold'}}>
            Enter your mobile number
          </MDHeadline>
        </View>
        <View style={{marginBottom: 30}}>
          <TouchableHighlight>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FlagView showIcon defaultFlag={flag} />
              <PhoneNumberInput
                autoFocus
                textContentType="telephoneNumber"
                value={phoneNumber}
                placeholder={FLAGS_AND_CODES[flag].placeholderNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                style={{backgroundColor: COLORS.white, width: '100%'}}
              />
            </View>
          </TouchableHighlight>
        </View>
        <View
          style={{
            marginBottom: 30,
            marginLeft: 10,
            marginRight: 10,
          }}>
          <Hyperlink
            linkStyle={{color: '#2980b9'}}
            linkText={(url) =>
              url === 'https://modeliver.com/terms_and_conditions'
                ? 'Terms & Conditions '
                : url === 'https://modeliver.com/privacy_policy'
                ? 'Privacy policy'
                : url
            }
            linkDefault>
            <MDText style={{textAlign: 'center'}}>
              {`By continuing, I confirm that i have read & agree to the `}
              https://modeliver.com/terms_and_conditions
              {'and '}
              https://modeliver.com/privacy_policy
            </MDText>
          </Hyperlink>
        </View>
        <View>
          <Button
            contentStyle={{
              backgroundColor: !phoneNumber ? 'grey' : COLORS.primary,
            }}
            disabled={!phoneNumber}
            onPress={onContinuePress}>
            Continue
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PhoneLoginScreen;
