import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import {requestLocationPermission} from '@services/Permissions';
import {
  LATITUDE,
  LONGITUDE,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from '@services/Location';

import {ANIMATE_TO_CURRENT_LOCATION_DURATION} from './map.utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '@Themes/Colors';
import * as REALTIME_CONSTANT from '../../constants/realtime';
Geolocation.setRNConfiguration({authorizationLevel: 'always'});

function MapScreen(props) {
  const [state, setState] = useState({
    currentLoc: props.currentLoc,
    isDriverLocationVisible: props.isDriverLocationVisible,
    allowGPS: true,
  });
  let isLocationPermissionGranted = false;

  let watchId = null;

  let map = null;
  useEffect(() => {
    async function run() {
      await setUpApp();
    }
    run();
    return () => watchId !== null && Geolocation.clearWatch(watchId);
  }, []);

  async function setUpApp() {
    const {onSetCurrentLocation, ws, driverInfo} = props;
    isLocationPermissionGranted = await requestLocationPermission();

    // update to https://github.com/react-native-community/react-native-geolocation
    if (isLocationPermissionGranted) {
      Geolocation.getCurrentPosition(
        (position) => {
          setState(
            {
              ...state,
              currentLoc: position.coords,
            },
            () => {
              onSetCurrentLocation(position.coords);

              ws.sendMessage({
                action: REALTIME_CONSTANT.ACTIONS.ACTIONS_LOCATION,
                data: {...position, driverInfo},
              });
              animateToCurrent(
                position.coords,
                ANIMATE_TO_CURRENT_LOCATION_DURATION,
              );
            },
          );
        },
        (error) => console.log('Maps Error: ', error),
        {enableHighAccuracy: true},
      );

      //Track motional Coordinates
      const watchId = Geolocation.watchPosition(
        (position) => {
          setState({...state, currentLoc: position.coords}, () => {
            onSetCurrentLocation(position.coords);

            ws.sendMessage({
              action: REALTIME_CONSTANT.ACTIONS.ACTIONS_LOCATION,
              data: {...position, driverInfo},
            });
          });
          animateToCurrent(
            position.coords,
            ANIMATE_TO_CURRENT_LOCATION_DURATION,
          );
        },
        (error) => console.log('Maps Error: ', error),
        {
          enableHighAccuracy: true,
          distanceFilter: 100,
        },
      );
    }
  }

  /*static getDerivedStateFromProps(props, state) {
    if (props.isDriverLocationVisible !== state.isDriverLocationVisible) {
      return {
        isDriverLocationVisible: props.isDriverLocationVisible,
      };
    }
    return state;
  }
  componentDidUpdate(prevProps, prevState) {
    const isLocationChanged =
      prevState.currentLoc.latitude !== this.state.currentLoc.latitude ||
      prevState.currentLoc.longitude !== this.state.currentLoc.latitude;
    if (isLocationChanged) {
      //if user toggled to show their GPS data
      if (this.state.isDriverLocationVisible) {
        //if user toggled to focus map view
        this.animateToCurrent(
          this.state.currentLoc,
          ANIMATE_TO_CURRENT_LOCATION_DURATION,
        );
      }
    }
  }
*/
  const animateToCurrent = (coords, speed) => {
    if (!coords) {
      coords = state.currentLoc;
    }

    if (!speed) {
      speed = ANIMATE_TO_CURRENT_LOCATION_DURATION;
    }
    const region = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    if (map) {
      map.animateToRegion(region, speed);
    }
  };

  const {content} = props;
  const {currentLoc} = state;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        //ref={ref => (this.map = ref)}
        onMapReady={animateToCurrent}
        // onMoveShouldSetResponder={this.draggedMap}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        <Marker
          style={styles.marker}
          coordinate={{
            latitude: currentLoc.latitude,
            longitude: currentLoc.longitude,
          }}
          /*ref={marker => {
              this.marker = marker;
            }}*/
        >
          <Icon name="navigation" size={30} color={Colors.blue} />
        </Marker>
      </MapView>

      <View style={styles.bottomContainer}>{content}</View>
    </View>
  );
}

MapScreen.defaultProps = {
  content: null,
  currentLoc: {},
  isDriverLocationVisible: false,
};
const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  marker: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 100 : 0,
  },
  topBar: {
    top: Platform.OS === 'android' ? hp('2%') : hp('5%'),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp('2%'),
  },
  rightBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  leftBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  locationSwitch: {
    left: 300,
  },
  container: {
    flex: 1,
  },
  bottom: {
    //position: 'absolute',
    //top: 0,
    //alignSelf: 'flex-end',
    //width: '100%',
    marginBottom: hp('4%'),
  },
  focusLoc: {
    width: hp('4.5%'),
    height: hp('4.5%'),
    marginRight: wp('2%'),
    left: 15,
  },
  userCount: {
    marginHorizontal: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  profile: {
    width: 40,
    height: 40,
  },
});
