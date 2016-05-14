//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Image from '../image/image';
import * as dialog from '../dialog';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function showDialogToOpenImageHandler(gallery) {
  return function showDialogToOpenImage() {
    dialog.openImage()
      .then((filePath) => {
        gallery.add(new Image(filePath));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

showDialogToOpenImageHandler.inject = ['gallery'];
