const request = require('request');
const keys = require('./apiKeys');

request({
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=${keys.mapQuestKey}&location=1301%20lombard%20street%20philadelphia`,
  json: true,
}, (error, response, body)=> {
  console.log('latitude', body.results[0].locations[0].latLng.lat);
  console.log('longitude' ,body.results[0].locations[0].latLng.lng)
})