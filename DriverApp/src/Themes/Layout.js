import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SCREEN_TYPE = {
  WINDOW: 'window',
  SCREEN: 'screen',
};
const getDimension = screenType => Dimensions.get(screenType);

const getWindowDimension = getDimension(SCREEN_TYPE.WINDOW);
const getScreenDimension = getDimension(SCREEN_TYPE.SCREEN);

export default {
  window: {
    width: getWindowDimension.width,
    height: getWindowDimension.height,
  },
  screen: {
    width: getScreenDimension.width,
    height: getScreenDimension.height,
  },
  buttonHeight: 50,
  isSmallDevice: width < 375,
};
