//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { updateSetting } from '../actions';
import * as dialog from '../dialog/dialog';
import log from '../log';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function showDialogToPickSaveDirHandler(dispatch, settings) {
  return function showDialogToPickSaveDir() {
    const currentDirPath = settings.get('save-dir-path');
    dialog.saveImagesTo(currentDirPath)
      .then((dirPath) => {
        dispatch(updateSetting('save-dir-path', dirPath));
      })
      .catch((err) => {
        log('pick save dir err');
        log(err);
      });
  };
}

showDialogToPickSaveDirHandler.inject = ['dispatch', 'settings'];
