import {decorate, observable, computed, action, set, values, toJS} from 'mobx';
import {DELIVERY} from '@modeliver_admin/models-util';
import API from '../services/API';
import {compareDate} from './utils/helper';
class Delivery {
  deliveriesById = null;
  pendingDeliveriesById = null;
  onRouteDeliveriesById = null;

  isLoadingPendingDeliveries = false;
  isLoadingOnRouteDeliveries = false;
  isAcceptingDelivery = false;
  isWaitingForDelivery = true;

  error = null;

  setDeliveryById = delivery => {
    const delveriesById = delivery.reduce((deliveriesById, delivery) => {
      return {...deliveriesById, [delivery.id]: delivery};
    }, {});
    this.deliveriesById = delveriesById;
    this.isWaitingForDelivery = false;
  };
  setError(error) {
    this.error = error;
    this.isAcceptingDelivery = false;
    this.isLoadingPendingDeliveries = false;
    this.isLoadingOnRouteDeliveries = false;
  }

  setDelivery(delivery) {
    set(this.deliveriesById, {[delivery.id]: delivery});
    this.error = null;
    this.isAcceptingDelivery = false;
  }
  setPendingDeliveries = deliveries => {
    this.pendingDeliveriesById = deliveries.reduce(
      (deliveriesById, delivery) => {
        return {...deliveriesById, [delivery.id]: delivery};
      },
      [],
    );
    this.isLoadingPendingDeliveries = false;
  };

  setOnRouteDeliveries = deliveries => {
    this.onRouteDeliveriesById = deliveries.reduce(
      (deliveriesById, delivery) => {
        return {...deliveriesById, [delivery.id]: delivery};
      },
      [],
    );
    this.isLoadingOnRouteDeliveries = false;
  };
  getPendingDeliveries = () => {
    this.isLoadingPendingDeliveries = true;
    API.getPendingDeliveries()
      .then(this.setPendingDeliveries)
      .catch(this.setError);
  };
  getOnRouteDeliveries = () => {
    this.isLoadingOnRouteDeliveries = true;
    API.getOnRouteDeliveries()
      .then(this.setOnRouteDeliveries)
      .catch(this.setError);
  };
  postAccept = data => {
    this.isAcceptingDelivery = true;
    API.postDelivery(data)
      .then(this.setDelivery)
      .catch(error => {
        this.setError(error);
      });
  };
  rejectDelivery = data => {
    this.deliveriesById.delete(data.id);
    this.isAcceptingDelivery = false;
  };
  postReject = data => {
    this.isAcceptingDelivery = true;

    API.postRejectDelivery(data)
      .then(this.rejectDelivery)
      .catch(this.setError);
  };
  get getDeliveriesSize() {
    return this.deliveriesById && values(this.deliveriesById).length;
  }
  get getDeliveriesList() {
    if (this.getDeliveriesSize) {
      return values(this.deliveriesById)
        .slice()
        .sort(compareDate);
    } else {
      return [];
    }
  }

  get getOldestDelivery() {
    if (this.getDeliveriesList.length) {
      return this.getDeliveriesList[0];
    }
    return null;
  }

  get getPendingDeliveriesList() {
    if (
      this.pendingDeliveriesById &&
      values(this.pendingDeliveriesById).length
    ) {
      return values(this.pendingDeliveriesById)
        .slice()
        .sort(compareDate);
    } else {
      return [];
    }
  }

  get getOnRouteDeliveriesList() {
    if (
      this.onRouteDeliveriesById &&
      values(this.onRouteDeliveriesById).length
    ) {
      return values(this.onRouteDeliveriesById)
        .slice()
        .sort(compareDate);
    } else {
      return [];
    }
  }
}

decorate(Delivery, {
  onRouteDeliveriesById: observable,
  pendingDeliveriesById: observable,
  isLoadingOnRouteDeliveries: observable,
  isLoadingPendingDeliveries: observable,
  deliveriesById: observable,
  isAcceptingDelivery: observable,
  isWaitingForDelivery: observable,
  error: observable,

  setDeliveryById: action,
  setDelivery: action,
  setPendingDeliveries: action,
  setOnRouteDeliveries: action,

  getPendingDeliveries: action,
  getOnRouteDeliveries: action,
  postAcceptDelivery: action,
  postRejectDelivery: action,
  rejectDelivery: action,
  setError: action,

  getDeliveriesList: computed,
  getDeliveriesSize: computed,
  getOldestDelivery: computed,
  getPendingDeliveriesList: computed,
  getOnRouteDeliveriesList: computed,
});

export default new Delivery();
