import * as Globals from '@config/Globals';

import * as Localstorage from './Localstorage';
import * as Constants from './Constants';
let ws = null;
function Realtime() {
  this.isConnected = false;

  if (!ws) {
    ws = new WebSocket(Globals.API_GATEWAY_WEBSOCKET_URL);
  }
}

Realtime.prototype.connect = async function(user) {
  const isConnected = await Localstorage.isExist(Constants.WS_CONNECTIONS);
  this.isConnected = JSON.parse(isConnected);
  console.log('isApp connect to websocket', isConnected, this.isConnected);
  if (!this.isConnected) {
    console.log('App connected to API Gateway: ', ws);

    ws.onopen = () => {
      this.isConnected = true;
      //this.sendMessage({action: })
      return true;
    };

    await Localstorage.set(Constants.WS_CONNECTIONS, JSON.stringify(true));
  }
  ws.onerror = error => {
    console.log('Websocket error: ', JSON.stringify(error));
  };
  ws.onclose = event => {
    console.log('Connection lost, reconnecting again. : ', event.reason);
    this.isConnected = false;
    setTimeout(async () => {
      await Localstorage.set(Constants.WS_CONNECTIONS, JSON.stringify(false));
      await this.connect(user);
    }, 1000);
  };
  return true;
};

Realtime.prototype.sendMessage = function({action, data}) {
  try {
    if (!this.isConnected) {
      this.connect()
        .then(() => {
          console.log('Reconnected: ');
        })
        .catch(error => {
          console.log('Failed to reconnect...');

          //this.connect()
        });
    }
    const payload = {
      action,
      data,
    };
    console.log(`SEND PAYLOAD: ${JSON.stringify(payload)}`);
    ws.send(JSON.stringify(payload));

    return payload;
  } catch (error) {
    console.log('Error sending: ', error);
    throw error;
  }
};

Realtime.prototype.closeConnection = function() {
  this.isConnected = false;
  ws.onclose = event => {
    console.log('Connection lost, reconnecting again. : ', event.reason);
    setTimeout(async () => {
      await Localstorage.set(Constants.WS_CONNECTIONS, JSON.stringify(false));
    }, 100);
  };
};
export default Realtime;
