'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  return function (filePath) {
    var image = components.gallery.findByFilePath(filePath);
    if (!image) {
      console.log('No image found for copy');
      return false;
    }
    electron.clipboard.writeImage(image.load().getNative());
  };

};
