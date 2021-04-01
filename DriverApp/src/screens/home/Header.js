import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {View, Platform} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';
import {COLORS} from '../../Themes';
import {PROFILE} from '../../navigation/nav.constants';
import {useNavigation} from '@react-navigation/native';
import {MOBILE_DRIVER} from '../../models';

function Header({
  store: {
    user: {info},
  },
}) {
  let shadowProps =
    Platform.OS === 'ios'
      ? {
          shadowOffset: {height: 72, width: 72},
          shadowOpacity: 15,
          shadowColor: COLORS.grey,
        }
      : {elevation: 20};
  const navigation = useNavigation();
  //let avatarText = MOBILE_DRIVER.getFullNameAbbr(info);

  return (
    <View
      style={{
        marginTop: 16,
        flex: 1,
        alignSelf: 'flex-end',
        marginRight: 16,
        ...shadowProps,
      }}>
      <TouchableHighlight
        underlayColor={COLORS.white}
        style={{width: 50, height: 50, borderRadius: 25}}
        onPress={() => {
          navigation.navigate(PROFILE);
        }}>
        <Avatar.Icon
          size={50}
          icon="account"
          style={{
            borderWidth: 2,
            borderColor: COLORS.white,
          }}
          //color={COLORS.}
        />
      </TouchableHighlight>
    </View>
  );
}

export default inject('store')(observer(Header));
