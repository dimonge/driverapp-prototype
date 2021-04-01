import {Auth} from 'aws-amplify';

function Authenticator() {}
const errorHandler = error => {
  if (error) {
    if (error.message) return error.message;
    else if (error.error && error.error.message) return error.error.message;
  }
};

Authenticator.prototype.signOut = function() {};

Authenticator.prototype.deviceId = function() {};

Authenticator.prototype.signIn = async function(phoneNumber) {
  try {
    console.log('phone number ', phoneNumber);
    const user = await Auth.signIn(phoneNumber);
    // You can select preferred mfa type, for example:
    // Select SMS as preferred
    return user;
  } catch (error) {
    if (error.code === 'UserNotFoundException') {
      // The error happens when the supplied username/email does not exist in the Cognito user pool
      console.log('No user is found.');
    } else {
      console.log(err);
    }
    throw error;
  }
};

Authenticator.prototype.sendCustomChallengeAnswer = async function(user, code) {
  try {
    // Select SMS as preferred
    const cognitoUser = await Auth.sendCustomChallengeAnswer(user, code);
    return cognitoUser;
  } catch (error) {
    throw error;
  }
};

Authenticator.prototype.currentAuthenticatedUser = async function() {
  try {
    const response = await Auth.currentAuthenticatedUser();
    return response;
  } catch (error) {
    throw error;
  }
};
Authenticator.prototype.confirmSignIn = async function(user, code) {
  try {
    const response = await Auth.confirmSignIn(user, code, 'SMS_MFA');
    return response;
  } catch (error) {
    throw error;
  }
};
export default new Authenticator();
