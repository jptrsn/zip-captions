const dotenv = require('dotenv').config({ path: __dirname + '/prod.env'});
const webpack = require('webpack');

function getClientEnvironment() {

  const processEnv = dotenv.parsed;
  // Grab ZIP_* environment variables and prepare them to be injected
  // into the application via DefinePlugin in webpack configuration.
  const ZIP_APP = /^ZIP_/i;

  const raw = Object.keys(processEnv)
    .filter((key) => ZIP_APP.test(key))
    .reduce((env, key) => {
      env[key] = processEnv[key];
      return env;
    }, {});

    console.log('PRODUCTION raw', raw);

  // Stringify all values so we can feed into webpack DefinePlugin
  return {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
}

module.exports = (config, options, context) => {
  // Overwrite the mode set by Angular if the NODE_ENV is set
  config.mode = process.env.NODE_ENV || config.mode;
  config.plugins.push(new webpack.DefinePlugin(getClientEnvironment()));
  return config;
};