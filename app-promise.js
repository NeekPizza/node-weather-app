const yargs = require('yargs');
const keys = require('./apiKeys');

const axios = require('axios');

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

  const encodedAddress = encodeURIComponent(argv.address);
  const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${keys.mapQuestKey}&location=${encodedAddress}`;

  axios.get(geocodeUrl).then((response) => {
    if(typeof response.data === 'string') {
      throw new Error('Unable to connnect to API servers');
    }
    const lat = response.data.results[0].locations[0].latLng.lat;
    const lng = response.data.results[0].locations[0].latLng.lng;
    const city = response.data.results[0].locations[0].adminArea5;
    const state = response.data.results[0].locations[0].adminArea3;
    console.log(`For ${city}, ${state}:`)
    const weatherUrl = `https://api.darksky.net/forecast/${keys.forecastKey}/${lat},${lng}`;
    return axios.get(weatherUrl)
  }).then((response) => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
  }).catch((e) => {
    console.log(e.message);
  });


  