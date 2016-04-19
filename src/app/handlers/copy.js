'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  dispatcher.on('copy-image', function (action) {
    var image = components.gallery.find(action.filePath);
    if (!image) {
      return false;
    }
    electron.clipboard.writeImage(image.getNative());
  });

  dispatcher.on('copy-text', function (action) {
    electron.clipboard.writeText(action.text);
  });

};
