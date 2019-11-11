class distanceHelper {
    constructor() {
        this.earthRadius = 6357;
    }

    hasValidCoords(customer) {
         let latRes;
         let longRes;
         let lat = Number(customer.latitude);
         let long = Number(customer.longitude);
         latRes = (!Number.isNaN(lat) && Math.abs(lat) <= 90) ? true : "Latitude is not valid ";
         longRes = (!Number.isNaN(long) && Math.abs(long) <= 180) ? true : "Longitude is not valid ";

         return latRes === true && longRes === true ? true : latRes + " and " + longRes;
    }

    _toRadians(degree) {
        return degree * (Math.PI / 180);
    }

    getDistance (customer, intercom) {
        const customerLatToRads = this._toRadians(Number(customer.latitude));
        const customerLongToRads = this._toRadians(Number(customer.longitude));
        const interLatToRads = this._toRadians(intercom.latitude);
        const interLongToRads = this._toRadians(intercom.longitude);

        const delta = Math.abs(customerLongToRads - interLongToRads);

        const angle = Math.acos(Math.sin(customerLatToRads) * Math.sin(interLatToRads) + Math.cos(customerLatToRads) * Math.cos(interLatToRads) * Math.cos(delta));

        return angle * this.earthRadius;
    }
}

module.exports = distanceHelper;
