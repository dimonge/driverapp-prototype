import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Container, Spinner} from 'native-base';
import {COLORS} from '../../Themes';

const LoadingIndicator = ({color}) => (
  <Container style={styles.container}>
    <Spinner color={color} />
  </Container>
);

LoadingIndicator.propTypes = {
  color: PropTypes.string,
};

LoadingIndicator.defaultProps = {
  color: COLORS.primary,
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
export default LoadingIndicator;
