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

  dispatcher.on(appActions.SHOW_IMAGE_IN_FOLDER, function (action) {
    electron.shell.showItemInFolder(action.filePath);
  });

};
