'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var metadata = require('../config/metadata');
var appActions = require('../app/actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

exports.imageContext = function (appDispatch, image) {

  var uploadersSubMenu = metadata.uploadHosts.map(function (host) {
    return {
      label: host.name,
      click: function () {
        appDispatch({
          actionName: 'upload',
          uploaderId: host.id,
          filePath: image.getFilePath()
        });
      }
    };
  });

  var publicUrlsSubMenu = image.getPublicUrls().map(function (publicUrl) {
    return {
      label: publicUrl,
      click: function () {
        appDispatch(appActions.copyText(publicUrl));
      }
    };
  });

  var template = [
    {
      label: 'Copy',
      click: function () {
        appDispatch(appActions.copyImage(image.getFilePath()));
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Upload',
      submenu: uploadersSubMenu
    }
  ];

  if (publicUrlsSubMenu.length) {
    template.push({
      label: 'Public URLs',
      submenu: publicUrlsSubMenu
    });
  }

  template = template.concat([
    {
      type: 'separator'
    },
    {
      label: 'Show in folder',
      click: function () {
        appDispatch({
          actionName: 'open-directory',
          filePath: image.getFilePath()
        })
      }
    }
  ]);

  return template;
};

exports.dashboard = function (appDispatch) {
  return [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          submenu: [
            {
              label: 'Desktop',
              click: function () {
                appDispatch({ actionName: 'capture-desktop' });
              }
            },
            {
              label: 'Selection',
              click: function () {
                appDispatch({ actionName: 'capture-selection' });
              }
            },
            {
              type: 'separator'
            },
            {
              label: 'Import from clipboard',
              click: function () {
                appDispatch({ actionName: 'import-clipboard' });
              }
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          label: 'Open...',
          click: function () {
            appDispatch({ actionName: 'import-open' });
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          click: function () {
            appDispatch(appActions.appQuit());
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Settings',
          click: function () {
            appDispatch({ actionName: 'open-settings' });
          }
        }
      ]
    },
    {
      label: 'Developer',
      submenu: [
        {
          label: 'Open dev tools',
          click: function (item, focusedWindow) {
            focusedWindow.webContents.openDevTools();
          }
        },
        {
          label: 'Reload',
          click: function (item, focusedWindow) {
            focusedWindow.reload();
          }
        }
      ]
    }
  ];
};
