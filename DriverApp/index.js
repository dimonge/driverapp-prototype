/**
 * @format
 */
if (__DEV__) console.disableYellowBox = true;
import Amplify from 'aws-amplify';
import config from './aws-exports';
import {enableLogging} from 'mobx-logger';
import en from './src/lang/en.json';
import i18n from 'i18n-js';
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {Provider as ANTProvider} from '@ant-design/react-native';
import Main from './src/App';
import {name as appName} from './app.json';
import store from './src/stores';
import {Provider} from 'mobx-react';
import StoryBookUI from './storybook/index';
import {FONTS, COLORS} from './src/Themes';

Amplify.configure(config);

i18n.fallbacks = true;
i18n.translations = {en};

if (__DEV__) {
  enableLogging();
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...COLORS,
  },
};

const App = (props) => (
  <Provider store={store}>
    <PaperProvider theme={theme}>
      <ANTProvider>
        <Main />
      </ANTProvider>
    </PaperProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => App);
