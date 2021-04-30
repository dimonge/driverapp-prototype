import {decorate, observable, action} from 'mobx';
import {LATITUDE, LONGITUDE} from '../services/Location';
import Realtime from '@services/Realtime';

class Location {
  currentLocation = {latitude: LATITUDE, longitude: LONGITUDE};

  isDriverLocationVisible = false;

  setShowDriverLocationOnMap = isDriverLocationVisible => {
    this.isDriverLocationVisible = isDriverLocationVisible;
  };

  setCurrentLocation = location => {
    this.currentLocation = location;
    //Realtime.sendMessage({action: 'hello', data: location});
  };
}

decorate(Location, {
  currentLocation: observable,
  isDriverLocationVisible: observable,
  setShowDriverLocationOnMap: action,
  setCurrentLocation: action,
});

export default new Location();
