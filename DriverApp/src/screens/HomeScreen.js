import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';

import Realtime from '@services/Realtime';

// UI components
import MapScreen from './map/MapScreen';

import DriverStatus from './changeStatus/DriverStatus';
import ChangeStatus from './changeStatus/ChangeStatus';

const ws = new Realtime();
const HomeScreen = inject('store')(
  observer((props) => {
    const {
      store: {
        user: {info, onGoOnline, isLoadingGoOnline},
        location: {
          currentLocation,
          isDriverLocationVisible,
          setShowDriverLocationOnMap,
          setCurrentLocation,
        },
      },
    } = props;

    const [state, setState] = useState({
      currentLoc: currentLocation,
      isDriverLocationVisible,
      isWsConnected: false,
    });

    useEffect(() => {
      // connect to API Gateway via websocket

      async function connect() {
        ws.connect(null).then(() => {
          setState({...state, isWsConnected: true});
        });
      }
      connect();

      return () => {
        ws.close();
      };
    }, []);

    const onSetCurrentLocation = (location) => {
      setState({
        ...state,
        currentLoc: location,
      });
      setCurrentLocation(location);
    };

    const onDriverLocation = () => {
      setState({
        ...state,
        isDriverLocationVisible: true,
      });
      setShowDriverLocationOnMap(true);
    };

    const onStatusChangePress = (status) => {
      onGoOnline(status);
    };

    let bottomSheetScreen = (
      <View style={styles.bottomSheetContainer}>
        <ChangeStatus
          info={info}
          isChangingStatus={isLoadingGoOnline}
          onPressCurrentLocation={onDriverLocation}
          onStatusChangePress={onStatusChangePress}
        />
        <DriverStatus info={info} />
      </View>
    );

    let user = null;
    if (info && info.attributes) {
      user = info.attributes;
    }
    /*return (
      <MapScreen
        isWsConnected={state.isWsConnected}
        ws={ws}
        currentLoc={state.currentLoc}
        isDriverLocationVisible={state.isDriverLocationVisible}
        onSetCurrentLocation={onSetCurrentLocation}
        driverInfo={user}
        content={bottomSheetScreen}
      />
    );*/

    return (
      <View>
        <Text>HomeScreen</Text>
      </View>
    );
  }),
);

HomeScreen.propTypes = {
  store: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
export default HomeScreen;
