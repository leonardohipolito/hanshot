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

  return function (uploaderId) {

    var Uploader = uploaders[uploaderId];
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
