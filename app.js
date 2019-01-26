const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require ('./weather/weather.js');

//Use yargs to accept address from terminal
const argv = yargs
  .options({
    z: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
    },
  })
  .help()
  .alias('help', 'h')
  .argv;

  geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      console.log(`Address Received: ${results.city}, ${results.state}`);
      weather.getWeather(results.latitude, results.longitude, (errorMessage, results) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(`It's current ${results.temperature}. It feels like ${results.apparentTemperature}.`);
        }
      });
    }
  });



