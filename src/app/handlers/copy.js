'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

var appActions = require('../actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  dispatcher.on(appActions.COPY_IMAGE, function (action) {
    var image = components.gallery.findByFilePath(action.filePath);
    if (!image) {
      console.log('No image found for copy');
      return false;
    }
    electron.clipboard.writeImage(image.load().getNative());
  });

  dispatcher.on(appActions.COPY_TEXT, function (action) {
    electron.clipboard.writeText(action.text);
  });

};
