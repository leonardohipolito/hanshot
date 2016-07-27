//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { join as pathJoin } from 'path';

import {
  IMAGE_FORMAT_JPG,
  IMAGE_FORMAT_PNG,
  IMAGE_FORMAT_DEFAULT,
  IMAGE_SOURCE_CLIPBOARD,
  IMAGE_SOURCE_DESKTOP,
  IMAGE_SOURCE_SELECTION,
} from './constants';

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function getDateString(date = new Date(), separator = '-') {
  // In JS months start from zero index
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ].join(separator);
}

function getExtension(imageFormat) {
  const formatToExtension = {
    [IMAGE_FORMAT_JPG]: 'jpg',
    [IMAGE_FORMAT_PNG]: 'png',
  };
  const extension = formatToExtension[imageFormat];
  return extension || IMAGE_FORMAT_DEFAULT;
}

function getSourcePart(source) {
  const sourcePartToSource = {
    [IMAGE_SOURCE_CLIPBOARD]: 'clipboard',
    [IMAGE_SOURCE_DESKTOP]: 'desktop',
    [IMAGE_SOURCE_SELECTION]: 'selection',
  };
  const sourcePart = sourcePartToSource[source];
  return sourcePart || 'screenshot';
}

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function savePathFactory(config, settings) {
  return function createSavePath(source) {
    // TODO: removed hard reference to config
    let dirPath = config.UNSAVED_PATH;
    if (settings.get('save-dir-selected')) {
      dirPath = settings.get('save-dir-path');
    }

    const sourcePart = getSourcePart(source);
    const dateString = getDateString();

    const fileBase = `${sourcePart}_${dateString}`;
    const fileExt = getExtension(settings.get('image-format'));

    const fileName = `${fileBase}.${fileExt}`;

    const filePath = pathJoin(dirPath, fileName);

    return filePath;
  };
}

savePathFactory.inject = ['config', 'settings'];
