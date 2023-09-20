const webpack = require('webpack');
const dotenv = require('dotenv').config({ path: __dirname + '/prod.env'});

function getClientEnvironment(mode) {

  console.log('webpack mode', mode);
  let processEnv = (mode === 'production') ? dotenv.parsed : process.env;
  
  // Grab ZIP_* environment variables and prepare them to be injected
  // into the application via DefinePlugin in webpack configuration.
  const ZIP_APP = /^ZIP_/i;

  const raw = Object.keys(processEnv)
    .filter((key) => ZIP_APP.test(key))
    .reduce((env, key) => {
      env[key] = processEnv[key];
      return env;
    }, {});

  const commitHash = require('child_process')
    .execSync('git rev-parse --short HEAD')
    .toString()
    .trim();

  raw.COMMIT_HASH = commitHash;

  const buildDate = new Date();
  raw.BUILD_DATE = buildDate.toDateString();
  raw.BUILD_YEAR = buildDate.getFullYear();

  console.log('raw', raw);

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
  config.plugins.push(new webpack.DefinePlugin(getClientEnvironment(config.mode)));
  return config;
};