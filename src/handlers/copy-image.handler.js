//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as fs from '../fs-extra';
import * as clipboard from '../clipboard';
import log from '../log';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// TODO: read from image cache
export default function copyImageHandler() {
  return function copyImage(filePath) {
    fs.readImage(filePath)
      .then(imageBuffer => {
        clipboard.writeImage(imageBuffer);
        log('copied i guess');
      })
      .catch(err => {
        log('COPY IMAGE READ ERROR');
        log(err);
      });
  };
}
