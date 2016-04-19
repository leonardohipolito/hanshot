'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var apiCreators = {
  capture: require('./capture'),
  copy: require('./copy'),
  file: require('./file'),
  uploader: require('./uploader'),
  window: require('./window')
};

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function createApi(app) {

  var api = {};

  Object.keys(apiCreators).forEach(function (key) {
    api[key] = apiCreators[key].call(null, app, api);
  });

  return api;
};
