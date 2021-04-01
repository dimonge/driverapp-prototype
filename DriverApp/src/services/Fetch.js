import {get, getDeviceId} from './Localstorage';
import {ID_TOKEN} from './Constants';
function Fetch(url, path) {
  this.path = path;
  this.fullPath = url + '/' + path;
  console.log('URL: ', this.fullPath);
}

const clientErrorHandler = async response => {
  console.log('response', response.ok, response.status);
  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
};
Fetch.prototype.POST = async function(data, options) {
  try {
    const path = genPath(this.fullPath, options);

    const response = await fetch(path, {
      method: 'POST',
      headers: await addHeaders(options),
      body: JSON.stringify(!!data ? data : {}),
    });

    return await clientErrorHandler(response);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const genPath = (fullPath, options) => {
  let path = fullPath;
  if (options && options.path) {
    path += options.path;
  }
  return path;
};
Fetch.prototype.GET = async function(id, options) {
  try {
    let path = genPath(this.fullPath, options);
    if (id) {
      path += `/${id}`;
    }

    const response = await fetch(path, {
      method: 'GET',
      headers: await addHeaders(options),
    });
    console.log('RESPONSE: ', response);
    return await clientErrorHandler(response);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

Fetch.prototype.PUT = async function(id, data, options) {
  try {
    if (!data) {
      console.log('Data is missing');
      return;
    }

    let path = genPath(this.fullPath, options);
    if (id) {
      path += `/${id}`;
    }
    const response = await fetch(path, {
      method: 'PUT',
      body: JSON.stringify(data),

      headers: await addHeaders(options),
    });
    return await clientErrorHandler(response);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

async function addHeaders(options) {
  let idToken = null;
  let deviceId = null;
  console.log('options: ', options);
  if (!!options) {
    if (options.idToken) {
      idToken = options.idToken;
    } else {
      idToken = await get(ID_TOKEN);
    }
    console.log('idToken: ', idToken);
    if (options.deviceId) {
      deviceId = options.deviceId;
    } else {
      deviceId = await getDeviceId();
    }

    return {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + idToken,
      deviceId,
      Type: 'supplier',
    };
  } else {
  }
}

export default Fetch;
