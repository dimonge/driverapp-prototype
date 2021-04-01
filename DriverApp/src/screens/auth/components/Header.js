import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Headline} from 'react-native-paper';

const styles = StyleSheet.create({
  headline: {
    marginBottom: 20,
  },
});
const Header = ({value}) => (
  <Headline style={styles.headline}>{value}</Headline>
);

Header.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Header;
