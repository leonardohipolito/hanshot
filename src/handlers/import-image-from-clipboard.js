//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as fs from 'fs';
import * as path from 'path';

import electron from 'electron';
import mkdirp from 'mkdirp';

import Image from '../image/image';
import * as clipboard from 'clipboard';

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function createFileName(type) {
  const types = {
    desktop: 'desktop',
    selection: 'selection',
    window: 'window',
    clipboard: 'clipboard',
    open: 'open',
  };

  const date = new Date();
  const dateName = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ].join('-');

  const fileName = [types[type], dateName].join('_');

  return fileName;
}

function createExt(imageFormat) {
  const formats = {
    jpg: 'jpg',
    png: 'png',
  };
  return formats[imageFormat];
}

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default {

  inject: ['settings', 'gallery'],

  create(settings, gallery) {
    return function importImageFromClipboardHandler() {
      const buffer = clipboard.readImageBuffer();

      // TODO
      // let buffer = null;
      // if (settings.get('image-format') === 'jpg') {
      //   buffer = nativeImage.toJpeg(settings.get('jpg-quality'));
      // } else {
      //   buffer = nativeImage.toPng();
      // }

      const cacheBaseDir = electron.app.getPath('appData');

      const fileName = [
        createFileName('clipboard'),
        createExt(settings.get('image-format')),
      ].join('.');

      let fileDir = path.join(cacheBaseDir, 'hanshot', 'unsaved');

      if (settings.get('save-dir-selected')) {
        fileDir = settings.get('save-dir-path');
      }

      const filePath = path.join(fileDir, fileName);

      mkdirp(fileDir, (mkdirErr) => {
        if (mkdirErr) throw mkdirErr;

        fs.writeFile(filePath, buffer, (writeErr) => {
          if (writeErr) throw writeErr;

          const image = new Image(filePath);
          image.load(nativeImage);
          gallery.add(image);

          console.log('Import');
        });
      });
    };
  },

};
