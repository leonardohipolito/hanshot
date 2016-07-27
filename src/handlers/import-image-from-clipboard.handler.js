//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as path from 'path';

import * as constants from '../constants';
import * as fs from '../fs-extra';
import * as clipboard from '../clipboard';
import log from '../log';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// TODO: decide image format
// TODO: cache image buffer
// TODO: check for empty buffer
export default function importImageFromClipboardHandler(
  gallery, savePathFactory
) {
  return function importImageFromClipboard() {
    const imageBuffer = clipboard.readImage();

    const filePath = savePathFactory(constants.IMAGE_SOURCE_CLIPBOBARD);
    const fileDir = path.dirname(filePath);

    fs.mkdir(fileDir)
      .then(() => fs.writeImage(filePath, imageBuffer))
      .then(() => {
        log('imported i guess');

        gallery.add({
          filePath,
        });
      })
      .catch((err) => {
        log('IMPORT IMAGE HANDLER ERROR');
        log(err);
      });
  };
}

importImageFromClipboardHandler.inject = [
  'gallery', 'savePathFactory',
];
