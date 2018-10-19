const {injectBabelPlugin} = require('react-app-rewired');

module.exports = function override(config, env) {
  // babel-plugin-import
  config = injectBabelPlugin(['import', {
    libraryName: 'antd-mobile',
    style: 'css',
    //style: true, // use less for customized theme
  }], config);

  

  return config;
};