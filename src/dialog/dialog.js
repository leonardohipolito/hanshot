//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as dialog from './dialog.shim';
// TODO: move config to deps
import metadata from '../config/metadata';
import { USER_HOME_PATH } from '../config';

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function createImageFilters() {
  const extensions = [];
  const names = [];

  metadata.imageFormats.forEach((format) => {
    extensions.push(...format.extensions);
    names.push(format.name);
  });

  const filters = [
    {
      name: `Supported images (${names.join(', ')})`,
      extensions,
    },
  ];

  return filters;
}

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export function openImage() {
  return new Promise((resolve, reject) => {
    dialog.openFile({
      defaultPath: USER_HOME_PATH,
      filters: createImageFilters(),
    })
      .then(resolve)
      .catch(reject);
  });
}

export function saveImagesTo(defaultPath) {
  return new Promise((resolve, reject) => {
    dialog.openDirectory({
      defaultPath,
      allowCreate: true,
    })
      .then(resolve)
      .catch(reject);
  });
}
