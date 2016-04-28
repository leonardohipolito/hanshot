'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var dialog = require('../../factories/dialog');
var appActions = require('../actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  return function () {
    var currentDirPath = components.settings.get('save-dir-path');
    dialog.saveImagesTo(currentDirPath, function (dirPath) {
      dispatcher.dispatch(appActions.updateSetting({
        key: 'save-dir-path',
        value: dirPath
      }));
    });
  };

};
