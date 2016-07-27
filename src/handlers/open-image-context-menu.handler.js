//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import electron from 'electron';

import log from '../log';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function openImageContextMenuHandler(gallery, contextMenuFactory) {
  return function openImageContextMenu(filePath) {
    const imageData = gallery.findBy('filePath', filePath);
    if (!imageData) {
      log('No image for context menu');
      return;
    }
    const template = contextMenuFactory(imageData.filePath, imageData.publicUrls);
    const menu = electron.Menu.buildFromTemplate(template);
    menu.popup();
  };
}

openImageContextMenuHandler.inject = ['gallery', 'contextMenuFactory'];
