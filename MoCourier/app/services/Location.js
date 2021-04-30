import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;

// get the region latitude and longitude from the user's region location
// Current location is Helsinki

export const LATITUDE = 60.169857;
export const LONGITUDE = 24.938379;
export const LATITUDE_DELTA = 0.01;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
