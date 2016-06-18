//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as fs from 'fs';

import mkdirp from 'mkdirp';
import Jimp from 'jimp';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// TODO: tests pls

export function mkdir(dirPath) {
  return new Promise((resolve, reject) => {
    mkdirp(dirPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function readImage(filePath) {
  return Jimp
    .read(filePath)
    .then(image => new Promise((resolve, reject) => {
      // TODO
      // https://github.com/oliver-moran/jimp/issues/141
      // Jimp requres MIME to be specified to get buffer
      // Either use original MIME with this hack or come up with a default MIME
      // eslint-disable-next-line no-underscore-dangle
      image.getBuffer(image._originalMime, (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    }));
}

export function writeImage(filePath, buffer, options = {}) {
  return Jimp
    .read(buffer)
    .then(image => new Promise((resolve, reject) => {
      if (options.quality) {
        image.quality(options.quality);
      }
      image.write(filePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }));
}

export function fileSize(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats.size);
      }
    });
  });
}

export function imageSize(filePath) {
  return Jimp
    .read(filePath)
    .then(image => new Promise((resolve) => {
      resolve({
        width: image.bitmap.width,
        height: image.bitmap.height,
      });
    }));
}

export function formatFileSize(bytes) {
  if (bytes >= 1000000000) {
    return `${(bytes / 1000000000).toFixed(1)} GB`;
  } else if (bytes >= 1000000) {
    return `${(bytes / 1000000).toFixed(1)} MB`;
  } else if (bytes >= 1000) {
    return `${(bytes / 1000).toFixed(1)} KB`;
  }
  return `${bytes} B`;
}
