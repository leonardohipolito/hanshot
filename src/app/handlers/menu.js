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
    var template = menuFactory.imageContext(dispatcher.dispatch, action.filePath);
    var menu = electron.Menu.buildFromTemplate(template);
    menu.popup();
  });

};
