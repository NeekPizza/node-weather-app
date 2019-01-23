const request = require('request');
const yargs = require('yargs');

const keys = require('./apiKeys');

//Use yargs to accept address from terminal
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
    },
  })
  .help()
  .alias('help', 'h')
  .argv;

//Encode address from yargs
const encodedAddress = encodeURIComponent(argv.address);

request({
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=${keys.mapQuestKey}&location=${encodedAddress}`,
  json: true,
}, (error, response, body)=> {
  console.log(body);
  if (error) {
    console.log('Unable to connect to servers.');
  } else if (body.results[0].locations.length === 0) {
    console.log('Unable to find that address');
  } else if (response.statusCode === 200) {
    console.log('Address', body.results[0].providedLocation.location);
    console.log('latitude', body.results[0].locations[0].latLng.lat);
    console.log('longitude' , body.results[0].locations[0].latLng.lng);
  }
});
