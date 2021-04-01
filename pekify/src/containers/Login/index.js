/**
 * Created by InspireUI on 19/02/2017.
 *
 * @format
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { WooWorker } from "api-ecommerce";

import { Icons, Languages, Styles, Config, withTheme, AppConfig } from "@common";
import { Icon, toast, warn, FacebookAPI } from "@app/Omni";
import { Spinner, ButtonIndex } from "@components";
import WPUserAPI from "@services/WPUserAPI";
import styles from "./styles";
import auth from "@react-native-firebase/auth";
import { SignInWithAppleButton } from "react-native-apple-authentication";

import InputPhoneModal from "./InputPhoneModal";
import InputVerifyCodeModal from "./InputVerifyCodeModal";
import { Title } from "react-native-paper";

class LoginScreen extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    isLogout: PropTypes.bool,
    onViewCartScreen: PropTypes.func,
    onViewHomeScreen: PropTypes.func,
    onViewSignUp: PropTypes.func,
    logout: PropTypes.func,
    navigation: PropTypes.object,
    onBack: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoading: false,
      logInFB: false,
      phoneNumber: "",
      modalVisible: false,
      showConfirmCode: false,
      verifyCode: "",
      confirmResult: null,
      loadingVerify: false
    };

    _this = this;
    this.onUsernameEditHandle = username => this.setState({ username });
    this.onPasswordEditHandle = password => this.setState({ password });

    this.focusPassword = () => this.password && this.password.focus();
  }

  componentDidMount() {
    const { user, isLogout } = this.props;

    // check case after logout
    if (user && isLogout) {
      this._handleLogout();
    }
  }

  // handle the logout screen and navigate to cart page if the new user login object exist
  componentWillReceiveProps(nextProps) {
    const { onViewCartScreen, user: oldUser, onViewHomeScreen } = this.props;

    const { user } = nextProps.user;
    const { params } = nextProps.navigation.state;

    // check case after logout
    if (user) {
      if (nextProps.isLogout) {
        this._handleLogout();
      } else if (!oldUser.user) {
        // check case after login
        this.setState({ isLoading: false });

        if (params && typeof params.onCart !== "undefined") {
          onViewCartScreen();
        } else {
          onViewHomeScreen();
        }

        const uName =
          user.last_name !== null || user.first_name !== null ? `${user.first_name} ${user.last_name}` : user.name;
        toast(`${Languages.welcomeBack} ${uName}.`);
        this.props.initAddresses(user);
      }
    }
  }

  _handleLogout = () => {
    const { logout, onViewHomeScreen } = this.props;
    logout();
    if (this.state.logInFB) {
      if (FacebookAPI.getAccessToken()) {
        FacebookAPI.logout();
      }
    }
    onViewHomeScreen();
  };

  _onBack = () => {
    const { onBack, goBack } = this.props;
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  onLoginPressHandle = async () => {
    const { login, netInfo } = this.props;

    if (!netInfo.isConnected) {
      return toast(Languages.noConnection);
    }

    this.setState({ isLoading: true });

    const { username, password } = this.state;

    // login the customer via Wordpress API and get the access token
    const json = await WPUserAPI.login(username.trim(), password);

    if (json === undefined) {
      this.stopAndToast(Languages.GetDataError);
    } else if (json.message) {
      warn(json);
      this.stopAndToast(json.message);
    } else {
      let customers = await WooWorker.getCustomerById(json.user.id);
      customers = { ...customers, username, password };

      this._onBack();
      login(customers, json.cookie);
    }
  };

  onFBLoginPressHandle = () => {
    const { login } = this.props;
    this.setState({ isLoading: true });
    FacebookAPI.login()
      .then(async token => {
        if (token) {
          const json = await WPUserAPI.loginFacebook(token);
          warn(["json", json]);
          if (json === undefined) {
            this.stopAndToast(Languages.GetDataError);
          } else if (json.error) {
            this.stopAndToast(json.error);
          } else {
            let customers = await WooWorker.getCustomerById(json.wp_user_id);
            customers = { ...customers, token, picture: json.user.picture };
            this._onBack();
            login(customers, json.cookie);
          }
        } else {
          this.setState({ isLoading: false });
        }
      })
      .catch(err => {
        warn(err);
        this.setState({ isLoading: false });
      });
  };

  onSMSLoginPressHandle = async phoneNumber => {
    _this.setState({ phoneNumber, loadingVerify: true });
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      if (confirmation._verificationId) {
        _this.setState({
          showConfirmCode: true,
          modalVisible: false,
          confirmResult: confirmation,
          loadingVerify: false
        });
      } else {
        _this.setState({ loadingVerify: false, modalVisible: false });
        toast("Please try again");
      }
    } catch (error) {
      _this.setState({ loadingVerify: false, modalVisible: false });
      toast(`Sign In With Phone Number Error: ${error.message}`);
    }
  };

  confirmVerifyCode = async verifyCode => {
    const { login } = this.props;
    _this.setState({ loadingVerify: true });
    const { phoneNumber, confirmResult } = this.state;
    try {
      // User entered code
      // Successful login - onAuthStateChanged is triggered
      // console.log("result", result);
      const result = await confirmResult.confirm(verifyCode);
      if (result._user.uid) {
        const endpoint = `${
          AppConfig.WooCommerce.url
        }/wp-json/api/flutter_user/firebase_sms_login?phone=${phoneNumber}&isSecure`;
        fetch(endpoint)
          .then(response => response.json())
          .then(async json => {
            warn(["json", json]);
            if (json === undefined) {
              _this.stopAndToast(Languages.GetDataError);
            } else if (json.error) {
              _this.stopAndToast(json.error);
            } else {
              let customers = await WooWorker.getCustomerById(json.wp_user_id);

              customers = { ...customers, phoneNumber, picture: null };
              _this.setState({ showConfirmCode: false, loadingVerify: false }, () => {
                _this._onBack();
                login(customers, json.cookie);
              });
            }
          })
          .catch(e => {
            toast(`Please type code again`);
            this.setState({ isLoading: false, showConfirmCode: false });
          });
      } else {
        toast(`Please type code again`);
        this.setState({ isLoading: false, showConfirmCode: false });
      }
    } catch (err) {
      warn(err);
      toast(`Verify fail`);
      this.setState({ isLoading: false, showConfirmCode: false });
    }
  };

  onSignUpHandle = () => {
    this.props.onViewSignUp();
  };

  checkConnection = () => {
    const { netInfo } = this.props;
    if (!netInfo.isConnected) toast(Languages.noConnection);
    return netInfo.isConnected;
  };

  stopAndToast = msg => {
    toast(msg);
    this.setState({ isLoading: false });
  };

  setModalVisible(key, visible) {
    _this.setState({ [key]: visible });
  }

  renderVerificationCodeInput = () => {
    const { loadingVerify, showConfirmCode } = this.state;
    return (
      <InputVerifyCodeModal
        loadingVerify={loadingVerify}
        showConfirmCode={showConfirmCode}
        confirmVerifyCode={this.confirmVerifyCode}
      />
    );
  };

  renderModal = () => {
    const { loadingVerify, modalVisible } = this.state;
    return (
      <InputPhoneModal
        modalVisible={modalVisible}
        loadingVerify={loadingVerify}
        onSMSLoginPressHandle={this.onSMSLoginPressHandle}
        setModalVisible={this.setModalVisible}
      />
    );
  };

  render() {
    const { username, password, isLoading } = this.state;
    const {
      theme: {
        colors: { background, text, placeholder }
      }
    } = this.props;

    return (
      <KeyboardAwareScrollView
        enableOnAndroid={false}
        style={{ backgroundColor: background }}
        contentContainerStyle={styles.container}>
        <View style={styles.logoWrap}>
          {/*<Image
            source={Config.LogoWithText}
            style={styles.logo}
            resizeMode="contain"
          />*/}
          <Text style={{ fontSize: 70, fontWeight: "bold" }}>Pekify</Text>
        </View>
        <View style={styles.subContain}>
          <View style={styles.loginForm}>
            <View style={styles.inputWrap}>
              <Icon name={Icons.MaterialCommunityIcons.Email} size={Styles.IconSize.TextInput} color={text} />
              <TextInput
                style={styles.input(text)}
                underlineColorAndroid="transparent"
                placeholderTextColor={placeholder}
                ref={comp => (this.username = comp)}
                placeholder={Languages.UserOrEmail}
                keyboardType="email-address"
                onChangeText={this.onUsernameEditHandle}
                onSubmitEditing={this.focusPassword}
                returnKeyType="next"
                value={username}
              />
            </View>
            <View style={styles.inputWrap}>
              <Icon name={Icons.MaterialCommunityIcons.Lock} size={Styles.IconSize.TextInput} color={text} />
              <TextInput
                style={styles.input(text)}
                underlineColorAndroid="transparent"
                placeholderTextColor={placeholder}
                ref={comp => (this.password = comp)}
                placeholder={Languages.password}
                onChangeText={this.onPasswordEditHandle}
                secureTextEntry
                returnKeyType="go"
                value={password}
              />
            </View>
            <ButtonIndex
              text={Languages.Login.toUpperCase()}
              containerStyle={styles.loginButton}
              onPress={this.onLoginPressHandle}
            />
          </View>
          <View style={styles.separatorWrap}>
            <Text style={styles.separatorText(text)}>{Languages.Or}</Text>
          </View>

          <ButtonIndex
            text={Languages.FacebookLogin.toUpperCase()}
            icon={Icons.MaterialCommunityIcons.Facebook}
            containerStyle={styles.fbButton}
            onPress={this.onFBLoginPressHandle}
          />

          {/*<ButtonIndex
            text={Languages.SMSLogin.toUpperCase()}
            icon={Icons.MaterialCommunityIcons.SMS}
            containerStyle={styles.smsButton}
            onPress={() => {
              this.setModalVisible("modalVisible", true);
              // this.textPhoneNumber.focus();
            }}
          />*/}
          {this.renderModal()}
          {this.renderVerificationCodeInput()}

          {SignInWithAppleButton(styles.appleBtn, {}, this.appleSignIn)}

          <TouchableOpacity style={Styles.Common.ColumnCenter} onPress={this.onSignUpHandle}>
            <Text style={[styles.signUp, { color: text }]}>
              {Languages.DontHaveAccount} <Text style={styles.highlight}>{Languages.signup}</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {isLoading ? <Spinner mode="overlay" /> : null}
      </KeyboardAwareScrollView>
    );
  }

  appleSignIn = async result => {
    const { login } = this.props;
    if (result.email) {
      this.setState({ isLoading: true });
      const fullName = `${result.firstName} ${result.lastName}`;
      const json = await WPUserAPI.appleLogin(result.email, fullName, result.email.split("@")[0]);
      if (json === undefined) {
        this.stopAndToast(Languages.GetDataError);
      } else if (json.error) {
        this.stopAndToast(json.error);
      } else {
        let customers = await WooWorker.getCustomerById(json.wp_user_id);
        this._onBack();
        login(customers, json.cookie);
      }
    } else {
      alert("Can't get email");
    }
  };
}

LoginScreen.propTypes = {
  netInfo: PropTypes.object,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, user });

const mapDispatchToProps = dispatch => {
  const { actions } = require("@redux/UserRedux");
  const AddressRedux = require("@redux/AddressRedux");
  return {
    login: (user, token) => dispatch(actions.login(user, token)),
    logout: () => dispatch(actions.logout()),
    initAddresses: customerInfo => {
      AddressRedux.actions.initAddresses(dispatch, customerInfo);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(LoginScreen));
