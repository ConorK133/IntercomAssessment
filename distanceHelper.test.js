require('mocha');
let chai = require('chai');

describe('distanceHelper', function() {
    const distanceHelper = new (require('./DistanceHelper.js'))();
    describe('hasValidCoords', function() {
        it("should return true with valid coords", function() {
            var res = distanceHelper.hasValidCoords({latitude: 40, longitude: 100});
            chai.assert.equal(true, res);
        });

        it("should return a valid error message if latitude is not valid", function() {
            var res = distanceHelper.hasValidCoords({latitude: "advb", longitude: 100});
            chai.assert.equal("Latitude is not valid  and true" , res);
        });

        it("should return a valid error message if longitude is not valid", function() {
            var res = distanceHelper.hasValidCoords({latitude: 40});
            chai.assert.equal("true and Longitude is not valid " , res);
        });
    });

    describe('getDistance', function () {
        it("Should return a correct value", function () {
            var res = distanceHelper.getDistance({latitude: 40, longitude: 100}, {latitude: 30, longitude: 90});
            chai.assert.equal(1432.1787966598706 , res);
        });
    });
});