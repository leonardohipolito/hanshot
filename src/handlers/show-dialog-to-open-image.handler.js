//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as dialog from '../dialog/dialog';
import log from '../log';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function showDialogToOpenImageHandler(gallery) {
  return function showDialogToOpenImage() {
    dialog
      .openImage()
      .then((filePath) => {
        gallery.add({
          filePath,
        });
      })
      .catch((err) => {
        log(err);
      });
  };
}

showDialogToOpenImageHandler.inject = ['gallery'];
