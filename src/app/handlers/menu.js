'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

var menuFactory = require('../../factory/menu');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  dispatcher.on('context-menu', function (action) {
    var image = components.imageLoader.getImage();
    if (!image) {
      console.log('No image for context menu');
      return;
    }
    var template = menuFactory.imageContext(dispatcher.dispatch, image);
    var menu = electron.Menu.buildFromTemplate(template);
    menu.popup();
  });

};
