/**
 * Created by InspireUI on 19/02/2017.
 *
 * @format
 */

import React from "react";
import PropTypes from "prop-types";
import { View, StatusBar, I18nManager } from "react-native";
import { WooWorker } from "api-ecommerce";
import { ThemeProvider } from "react-native-paper";
import { StackActions, NavigationActions } from "react-navigation";
import NetInfo from "@react-native-community/netinfo";

import { Config, AppConfig, Device, Styles, Languages, Theme, withTheme } from "@common";
import { MyToast } from "@containers";
import { AppIntro, ModalReview } from "@components";
import Navigation from "@navigation";
import { connect } from "react-redux";
import store from "@store/configureStore";

import MenuSide from "@components/LeftMenu/MenuOverlay";
// import MenuSide from "@components/LeftMenu/MenuScale";
// import MenuSide from '@components/LeftMenu/MenuSmall';
// import MenuSide from '@components/LeftMenu/MenuWide';

import { toast, warn, closeDrawer } from "./Omni";

class Router extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  static propTypes = {
    introStatus: PropTypes.bool
  };

  componentDidMount() {
    const language = store.getState().language;
    // set default Language for App
    Languages.setLanguage(language.lang);

    // Enable for mode RTL
    I18nManager.forceRTL(language.lang === "ar");
  }

  componentWillMount() {
    // init wooworker
    WooWorker.init({
      url: AppConfig.WooCommerce.url,
      consumerKey: AppConfig.WooCommerce.consumerKey,
      consumerSecret: AppConfig.WooCommerce.consumerSecret,
      wp_api: true,
      version: "wc/v3",
      queryStringAuth: true,
      language: this.props.language.lang
    });

    NetInfo.fetch().then(state => {
      this.props.updateConnectionStatus(state.type !== "none");
      this.setState({ loading: false });
    });
  }

  goToScreen = (routeName, params) => {
    if (!this.navigator) {
      return toast("Cannot navigate");
    }

    // fix the navigation for Custom page
    if (routeName === "CustomPage") {
      this.navigator.dispatch(
        StackActions.reset({
          actions: [
            NavigationActions.navigate({
              params,
              routeName
            })
          ],
          index: 0
        })
      );
    } else {
      this.navigator.dispatch({ type: "Navigation/NAVIGATE", routeName, params });
    }

    closeDrawer();
  };

  render() {
    const { isDarkTheme } = this.props;

    if (!this.props.introStatus) {
      return <AppIntro />;
    }

    if (this.state.loading) {
      return <View />;
    }

    // get theme based on dark or light mode
    const theme = isDarkTheme ? Theme.dark : Theme.light;

    return (
      <ThemeProvider theme={theme}>
        <MenuSide
          goToScreen={this.goToScreen}
          routes={
            <View style={[Styles.app, { backgroundColor: theme.colors.background }]}>
              <StatusBar
                barStyle={"light-content"}
                animated
                hidden={Device.isIphoneX ? false : !Config.showStatusBar}
              />
              <MyToast />
              <Navigation ref={comp => (this.navigator = comp)} />
              <ModalReview />
            </View>
          }
        />
      </ThemeProvider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  const { actions } = require("@redux/NetInfoRedux");

  return {
    updateConnectionStatus: isConnected => dispatch(actions.updateConnectionStatus(isConnected))
  };
};

const mapStateToProps = state => ({
  introStatus: state.user.finishIntro,
  userInfo: state.user.user,
  language: state.language,
  netInfo: state.netInfo,
  isDarkTheme: state.app.isDarkTheme,
  rtl: state.language.rtl
});

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(Router));
