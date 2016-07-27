//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as path from 'path';

import * as fs from '../fs-extra';
import * as buffer from '../buffer';
import log from '../log';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// TODO: decide image format
// TODO: cache image buffer
// TODO: upload
// TODO: notify
export default function saveImageHandler(gallery) {
  return function saveImage(filePath, dataURL) {
    const fileDir = path.dirname(filePath);
    const imageBuffer = buffer.fromDataURL(dataURL);

    fs.mkdir(fileDir)
      .then(() => fs.writeImage(filePath, imageBuffer))
      .then(() => {
        log('saved i guess');

        gallery.add({
          filePath,
        });

        // if (settings.get('upload-after-capture')) {
        //   dispatch(uploadImage(filePath));
        // } else {
        //   notify(notificationFactory.screenshotSaved());
        // }
      })
      .catch((err) => {
        log('SAVE IMAGE HANDLER ERROR');
        log(err);
      });
  };
}

saveImageHandler.inject = ['gallery'];
