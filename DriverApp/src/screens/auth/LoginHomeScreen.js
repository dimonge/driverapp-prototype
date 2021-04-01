import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  TouchableHighlight,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {COLORS} from '../../Themes';
import {MDHeadline, MDTitle, MDText} from '../../components/Text/Text';
import {LOGIN_WITH_PHONE_NUMBER} from '../../navigation/nav.constants';
import FlagView from './components/FlagView';

function LoginHomeScreen() {
  const navigator = useNavigation();
  const _onFocus = () => {
    navigator.navigate(LOGIN_WITH_PHONE_NUMBER);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Modriver</Text>
      </View>
      <View style={styles.loginView}>
        <MDTitle style={styles.loginText}>
          Save time doing the real work
        </MDTitle>
        <TouchableHighlight underlayColor={COLORS.white} onPress={_onFocus}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FlagView onPress={_onFocus} />

            <MDText
              style={{
                fontSize: 16,
                textTransform: 'none',
                backgroundColor: COLORS.white,
                color: COLORS.disabled,
              }}>
              Enter your mobile number
            </MDText>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    alignContent: 'stretch',
  },
  header: {
    flex: 3,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 50,
    fontWeight: 'bold',
  },

  loginView: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  loginText: {
    marginBottom: 20,
  },
});

export default LoginHomeScreen;
