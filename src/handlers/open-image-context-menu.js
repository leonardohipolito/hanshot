'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

var menuFactory = require('../../factories/menu');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  return function (filePath) {
    var image = components.gallery.findByFilePath(filePath);
    if (!image) {
      console.log('No image for context menu');
      return;
    }
    var template = menuFactory.imageContext(dispatcher.dispatch, image);
    var menu = electron.Menu.buildFromTemplate(template);
    menu.popup();
  };

};
