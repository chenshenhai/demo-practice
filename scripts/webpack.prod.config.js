// This config is for building dist files
const getWebpackConfig = require('./utils/build-config');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const { webpack } = getWebpackConfig;

// noParse still leave `require('./locale' + name)` in dist files
// ignore is better
// http://stackoverflow.com/q/25384360
function ignoreMomentLocale(webpackConfig) {
  delete webpackConfig.module.noParse;
  webpackConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
}

function addLocales(webpackConfig) {
  let packageName = 'mycomponent-with-locales';
  if (webpackConfig.entry['mycomponent.min']) {
    packageName += '.min';
  }
  webpackConfig.entry[packageName] = './index-with-locales.js';
  webpackConfig.output.filename = '[name].js';
}

function externalMoment(config) {
  config.externals.moment = {
    root: 'moment',
    commonjs2: 'moment',
    commonjs: 'moment',
    amd: 'moment',
  };
}

const webpackConfig = getWebpackConfig(false);
if (process.env.RUN_ENV === 'PRODUCTION') {
  webpackConfig.forEach(config => {
    ignoreMomentLocale(config);
    externalMoment(config);
    addLocales(config);
  });
}

const webpackDarkConfig = getWebpackConfig(false);

webpackDarkConfig.forEach(config => {
  ignoreMomentLocale(config);
  externalMoment(config);
  const themeReg = new RegExp(`dark(.min)?\\.js(\\.map)?`);
  // ignore emit ${theme} entry js & js.map file
  config.plugins.push(new IgnoreEmitPlugin(themeReg));
});

module.exports = webpackConfig.concat(webpackDarkConfig);