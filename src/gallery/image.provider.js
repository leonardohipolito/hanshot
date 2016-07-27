//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as path from 'path';

import { receiveImage } from '../store/actions';
import * as fs from '../fs-extra';
import * as buffer from '../buffer';
import log from '../log';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function imageProvider(store, gallery) {
  function provideImage() {
    const imageData = gallery.last();
    if (!imageData) {
      store.dispatch(receiveImage(null));
      return;
    }

    const filePath = imageData.filePath;

    Promise
      .all([
        fs.readImage(filePath),
        fs.fileSize(filePath),
        fs.imageSize(filePath),
      ])
      .then((values) => {
        const [imageBuffer, fileSize, { width, height }] = values;

        const image = {
          filePath,
          fileName: path.basename(filePath),
          fileSize,
          fileSizeHuman: fs.formatFileSize(fileSize),
          dataURL: buffer.toDataURL(imageBuffer),
          width,
          height,
          publicUrls: imageData.publicUrls || [],
        };

        store.dispatch(receiveImage(image));
      })
      .catch((err) => {
        log('ERROR: provideImage');
        log(err);
      });
  }

  // TODO: move listeners out of here
  gallery.on('add', provideImage);
  gallery.on('update', provideImage);

  // TODO: move call out of here
  provideImage();

  return provideImage;
}

imageProvider.inject = ['store', 'gallery'];
