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
    var image = components.gallery.findByFilePath(action.filePath);
    if (!image) {
      console.log('No image found for copy');
      return false;
    }
    electron.clipboard.writeImage(image.load().getNative());
  });

  dispatcher.on('copy-text', function (action) {
    electron.clipboard.writeText(action.text);
  });

};
