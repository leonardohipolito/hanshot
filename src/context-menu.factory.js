//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import {
  copyImage,
  copyText,
  showImageInFolder,
  uploadImage,
} from './actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function contextMenuFactory(dispatch, metadata) {
  return function createContextMenu(filePath, publicUrls = []) {
    const uploadersSubMenu = metadata.uploadHosts.map((host) => ({
      label: host.name,
      click: () => dispatch(uploadImage(filePath, host.id)),
    }));

    const publicUrlsSubMenu = publicUrls.map((publicUrl) => ({
      label: publicUrl,
      click: () => dispatch(copyText(publicUrl)),
    }));

    const template = [
      {
        label: 'Copy',
        click: () => dispatch(copyImage(filePath)),
      },
      {
        type: 'separator',
      },
      {
        label: 'Upload',
        submenu: uploadersSubMenu,
      },
    ];

    if (publicUrlsSubMenu.length) {
      template.push({
        label: 'Public URLs',
        submenu: publicUrlsSubMenu,
      });
    }

    template.push(...[
      {
        type: 'separator',
      },
      {
        label: 'Show in folder',
        click: () => dispatch(showImageInFolder(filePath)),
      },
    ]);

    return template;
  };
}

contextMenuFactory.inject = ['dispatch', 'metadata'];
