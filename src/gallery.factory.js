//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as path from 'path';

import Collection from './collection';
import { receiveImage } from './store/actions';
import * as fs from './fs-extra';
import * as buffer from './buffer';
import log from './log';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function galleryFactory(cache, store) {
  const gallery = new Collection();

  cache.on('load', () => {
    // Fill up gallery with cached images
    const items = cache.get('gallery', []);
    items.forEach((item) => {
      gallery.add(item);
    });
  });

  function fetchImage() {
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
          publicUrls: imageData.publicUrls || []
        };

        store.dispatch(receiveImage(image));
      })
      .catch((err) => {
        log('ERROR: fetchImage');
        log(err);
      });
  }

  gallery.on('add', fetchImage);
  gallery.on('update', fetchImage);

  // Update store with the latest image when app starts
  fetchImage();

  return gallery;
}

galleryFactory.inject = ['cache', 'store'];
