'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function createCopyApi(app) {

  return {

    image: function (filePath) {
      console.log(filePath);
      var image = app.gallery.find(filePath);
      if (!image) {
        return false;
      }
      electron.clipboard.writeImage(image.getNative());
    },

    text: function (text) {
      electron.clipboard.writeText(text);
    }

  };

};
