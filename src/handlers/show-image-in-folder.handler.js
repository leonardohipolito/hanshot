//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function showImageInFolderHandler() {
  return function showImageInFolder(filePath) {
    electron.shell.showItemInFolder(filePath);
  };
}
