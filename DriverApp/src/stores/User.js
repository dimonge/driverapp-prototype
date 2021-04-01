import {configure, observable, computed, action, decorate, set} from 'mobx';

import {USER} from '@modeliver_admin/models-util';

import * as Localstorage from '@services/Localstorage';
import {UserAsyncStorageKey, ID_TOKEN} from '@services/Constants';
import Authenticator from '@services/Authenticator';
import API from '@services/API';

configure({enforceActions: 'never'});

class User {
  isLoading = true;

  info = null;
  isLoggedIn = false;
  isLoggingIn = false;
  loginError = null;

  isLoadingGoOnline = false;
  goOnlineError = null;

  _persistUserInfo = async info => {
    await Localstorage.set(UserAsyncStorageKey, JSON.stringify(info));
  };

  get isOnline() {
    return this.getState === USER.DRIVER_STATE.AVAILABLE;
  }

  get getState() {
    return (!!this.info && this.info.state) || USER.DRIVER_STATE.OFF_DUTY;
  }

  setState = info => {
    this.loginError = null;
    this.info = info;
    this.isLoggedIn = !!info;
    this.isLoading = false;
    this.isLoggingIn = false;
  };
  setGoOnline = info => {
    this.loginError = null;
    set(this.info, {...info});
    this.isLoadingGoOnline = false;
  };
  setGoOnlineError = error => {
    this.goOnlineError = error;
    this.isLoadingGoOnline = false;
  };
  setError = error => {
    this.isLoggingIn = false;
    this.isLoggedIn = false;
    this.loginError = error;
    this.isLoading = false;
  };
  onLoginPhoneNumberVerify = (user, code) => {
    this.isLoggingIn = true;
    Authenticator.sendCustomChallengeAnswer(user, code)
      .then(info => {
        this._persistUserInfo(info)
          .then(() => this.setState(info))
          .catch(error => this.setError(error));
      })
      .catch(error => {
        this.setError(error + Date.now().toString());
      });
  };
  onLogin = (email, password) => {
    this.isLoggingIn = true;
    Authenticator.login(email, password)
      .then(info => {
        this._persistUserInfo(info)
          .then(() => this.setState(info))
          .catch(error => this.setError(error));
      })
      .catch(error => {
        this.setError(error + Date.now().toString());
      });
  };

  onLogout = () => {
    Authenticator.signOut().then(() => {
      Localstorage.removeData(UserAsyncStorageKey)
        .then(() => {
          this.setState(null);
        })
        .catch(error => this.setError(error));
    });
  };
  onForgotPassword = email => {
    Authenticator.resetPassword(email)
      .then(() => {
        this.setState(null);
      })
      .catch(error => this.setError(error));
  };

  onIsUserLoggedIn = () => {
    Authenticator.currentAuthenticatedUser()
      .then(user => {
        if (user) {
          this._persistUserInfo(user)
            .then(() => this.setState(user))
            .catch(error => this.setError(error));
        }
      })
      .catch(this.setError);
  };

  onGoOnline = data => {
    this.isLoadingGoOnline = true;
    API.goOnline(data)
      .then(info => {
        this._persistUserInfo(info)
          .then(() => this.setGoOnline(info))
          .catch(this.setError);
      })
      .catch(this.setGoOnlineError);
  };
}

decorate(User, {
  info: observable,
  isLoggingIn: observable,
  isLoggedIn: observable,
  isLoading: observable,
  loginError: observable,
  goOnlineError: observable,
  isLoadingGoOnline: observable,

  setState: action,
  onLogin: action,
  onLogout: action,
  onLoginPhoneNumberVerify: action,
  onForgotPassword: action,
  onIsUserLoggedIn: action,
  onGoOnline: action,
  setError: action,
  setGoOnline: action,
  setGoOnlineError: action,

  getState: computed,
  isOnline: computed,
});

export default new User();
