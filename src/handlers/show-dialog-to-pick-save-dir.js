//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import actions from '../actions';
import * as dialog from '../dialog';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function showDialogToPickSaveDirHandler(dispatch, settings) {
  return function showDialogToPickSaveDir() {
    const currentDirPath = settings.get('save-dir-path');
    dialog.saveImagesTo(currentDirPath)
      .then((dirPath) => {
        dispatch(actions.updateSetting({
          key: 'save-dir-path',
          value: dirPath,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

showDialogToPickSaveDirHandler.inject = ['dispatch', 'settings'];
