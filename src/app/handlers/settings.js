'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var dialog = require('../../factories/dialog');
var storeActions = require('../../store/actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  dispatcher.on('settings-changed', function (action) {
    components.settings.set(action.key, action.value);
    components.store.dispatch(
      storeActions.updateSetting(action.key, action.value)
    );
  });

  dispatcher.on('settings-dialog', function (action) {
    var currentDirPath = components.settings.get('save-dir-path');
    dialog.saveImagesTo(currentDirPath, function (dirPath) {
      dispatcher.dispatch({
        actionName: 'settings-changed',
        key: 'save-dir-path',
        value: dirPath
      });
    });
  });

};
