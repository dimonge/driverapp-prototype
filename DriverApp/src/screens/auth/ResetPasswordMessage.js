import React from 'react';
import {View, Text} from 'react-native';
import i18n from 'i18n-js';
import {StyleSheet} from 'react-native';
import {Paragraph} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ResetPasswordMessage = () => (
  <View style={styles.container}>
    <Paragraph>{i18n.t('resetPasswordMessage')}</Paragraph>
  </View>
);

export default ResetPasswordMessage;
