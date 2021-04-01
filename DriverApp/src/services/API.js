import Fetch from './Fetch';
import {REST_URL} from './Constants';
import {ROLE, USER, LOGIN, DELIVERIES, SUPPLIER} from './Endpoint';

function API() {
  this.roleFetch = new Fetch(REST_URL, ROLE);
  this.userFetch = new Fetch(REST_URL, USER);
  this.loginFetch = new Fetch(REST_URL, LOGIN);
  this.goOnlineFetch = new Fetch(REST_URL, SUPPLIER);
  this.deliveryFetch = new Fetch(REST_URL, DELIVERIES);
}

API.prototype.login = async function(userId, options) {
  try {
    const user = await this.loginFetch.POST(null, options);
    return user;
  } catch (error) {
    return errorLogger(error);
  }
};

API.prototype.goOnline = async function(data) {
  try {
    const response = await this.goOnlineFetch.PUT(
      null,
      {isOnline: data},
      {
        path: '/statusChange',
      },
    );
    return response;
  } catch (error) {
    return errorLogger(error);
  }
};

API.prototype.postDelivery = async function(data) {
  try {
    const response = await this.deliveryFetch.PUT(data.id, data);
    return response;
  } catch (error) {
    return errorLogger(error);
  }
};

API.prototype.getPendingDeliveries = async function() {
  try {
    return await this.deliveryFetch.GET(null, {
      path: '/pending_deliveries_driver',
    });
  } catch (error) {
    return errorLogger(error);
  }
};

API.prototype.getOnRouteDeliveries = async function() {
  try {
    return await this.deliveryFetch.GET(null, {
      path: '/in_transit_deliveries_driver',
    });
  } catch (error) {
    return errorLogger(error);
  }
};
API.prototype.getOnTransitDeliveries = async function() {};
function errorLogger(error) {
  throw error;
}

export default new API();
