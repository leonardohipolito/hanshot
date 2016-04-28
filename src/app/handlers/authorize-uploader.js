'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var uploaders = {
  imgur: require('../../uploaders/imgur'),
  dropbox: require('../../uploaders/dropbox')
};
//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  return function (action) {

    var Uploader = uploaders[action.uploaderId];
    if (!Uploader) {
      return;
    }

    var uploader = new Uploader(components.cache);
    if (uploader.isAuthorized()) {
      return;
    }

    uploader.authorize();

  };

};
