/**
 * Created by InspireUI on 01/03/2017.
 * An API for JSON API Auth Word Press plugin.
 * https://wordpress.org/plugins/json-api-auth/
 *
 * @format
 */

import { AppConfig } from "@common";
import { request, error } from "./../Omni";

const url = AppConfig.WooCommerce.url;
const isSecured = url.startsWith("https");
const secure = isSecured ? "" : "&insecure=cool";
const cookieLifeTime = 120960000000;

const WPUserAPI = {
  login: async (username, password) => {
    const _url = `${url}/wp-json/api/flutter_user/generate_auth_cookie`;
    return await request(_url, {
      method: "POST",
      body: JSON.stringify({
        second: cookieLifeTime,
        username,
        password
      })
    });
  },
  loginFacebook: async token => {
    const _url = `${url}/wp-json/api/flutter_user/fb_connect/?second=${cookieLifeTime}&access_token=${token}${secure}`;
    return await request(_url);
  },
  loginSMS: async token => {
    const _url = `${url}/wp-json/api/flutter_user/sms_login/?access_token=${token}${secure}`;
    return await request(_url);
  },
  appleLogin: async (email, fullName, username) => {
    const _url = `${url}/wp-json/api/flutter_user/apple_login?email=${email}&display_name=${fullName}&user_name=${username}${secure}`;
    return await request(_url);
  },
  register: async ({ username, email, firstName, lastName, password = undefined }) => {
    try {
      const _url = `${url}/wp-json/api/flutter_user/register/`;
      return await request(_url, {
        method: "POST",
        body: JSON.stringify({
          username,
          user_login: username,
          user_email: email,
          email: email,
          display_name: `${firstName} ${lastName}`,
          first_name: firstName,
          last_name: lastName,
          password: password,
          user_pass: password
        })
      });
    } catch (err) {
      error(err);
      return { error: err };
    }
  }
};

export default WPUserAPI;
