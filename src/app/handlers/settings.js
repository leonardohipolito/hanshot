'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var dialog = require('../../factories/dialog');
var storeActions = require('../../store/actions');
var appActions = require('../actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  dispatcher.on(appActions.UPDATE_SETTING, function (action) {
    components.settings.set(action.key, action.value);
    components.store.dispatch(
      storeActions.updateSetting(action.key, action.value)
    );
  });

  dispatcher.on(appActions.SHOW_DIALOG_TO_PICK_SAVE_DIR, function () {
    var currentDirPath = components.settings.get('save-dir-path');
    dialog.saveImagesTo(currentDirPath, function (dirPath) {
      dispatcher.dispatch(appActions.updateSetting({
        key: 'save-dir-path',
        value: dirPath
      }));
    });
  });

};
