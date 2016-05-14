//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// TODO: Seems like dialogs are not testable yet
//       https://github.com/electron/spectron/issues/23

const PROP_OPEN_FILE = 'openFile';
const PROP_OPEN_DIR = 'openDirectory';
const PROP_CREATE_DIR = 'createDirectory';

export function openFile(options = {
  defaultPath: null,
  filters: [],
}) {
  const dialogOptions = {
    defaultPath: options.defaultPath,
    properties: [PROP_OPEN_FILE],
    filters: openFile.filters,
  };
  return new Promise((resolve, reject) => {
    electron.dialog.showOpenDialog(dialogOptions, (paths) => {
      if (paths) {
        resolve(paths[0]);
      } else {
        reject(new Error('No file selected'));
      }
    });
  });
}

export function openDirectory(options = {
  defaultPath: null,
  allowCreate: false,
  filters: [],
}) {
  const dialogOptions = {
    defaultPath: options.defaultPath,
    properties: [PROP_OPEN_DIR],
    filters: options.filters,
  };
  if (options.allowCreate) {
    dialogOptions.properties.push(PROP_CREATE_DIR);
  }
  return new Promise((resolve, reject) => {
    electron.dialog.showOpenDialog(dialogOptions, (paths) => {
      if (paths && Array.isArray(paths) && paths.length) {
        resolve(paths[0]);
      } else {
        reject(new Error('No directory selected'));
      }
    });
  });
}
