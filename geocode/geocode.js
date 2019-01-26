const request = require('request');

const keys = require('../apiKeys');

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  
  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${keys.mapQuestKey}&location=${encodedAddress}`,
    json: true,
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to servers.');
    } else if (body.results[0].locations.length === 0) {
      callback('Unable to find that address');
    } else if (response.statusCode === 200) {
      callback(undefined, {
        city: body.results[0].locations[0].adminArea5,
        state: body.results[0].locations[0].adminArea3,
        latitude: body.results[0].locations[0].latLng.lat,
        longitude:body.results[0].locations[0].latLng.lng,
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;