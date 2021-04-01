import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import i18n from 'i18n-js';
import {withTheme} from 'react-native-paper';
import {Spinner} from 'native-base';

import {SwipeToUnlock, CustomBottomSheet} from '../../components';
import {COLORS as Colors} from '../../Themes';

const ChangeStatusSheet = ({isLoading, onGoOnline}) => {
  function slider() {
    return (
      <View style={styles.panel}>
        <SwipeToUnlock
          shouldResetAfterSuccess={false}
          railBackgroundColor="#3F51B5"
          title={i18n.t('buttonSwipeToGoOnline')}
          onSwipeSuccess={() => {
            onGoOnline();
          }}
        />
      </View>
    );
  }
  function loadingIndicator() {
    return (
      <View style={styles.panel}>
        <Spinner color={Colors.loadingColor} />
      </View>
    );
  }
  return (
    <CustomBottomSheet
      enabledGestureInteraction={false}
      snapPoints={[200]}
      content={isLoading ? loadingIndicator : slider}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panel: {
    height: 200,
    padding: 20,
    backgroundColor: 'white',
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
});

ChangeStatusSheet.propTypes = {
  onGoOnline: PropTypes.func,
};

ChangeStatusSheet.defaultProps = {
  onGoOnline: e => e,
};

export default withTheme(ChangeStatusSheet);
