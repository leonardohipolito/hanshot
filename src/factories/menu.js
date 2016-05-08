'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var metadata = require('../config/metadata');
var appActions = require('../actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

exports.imageContext = function (appDispatch, image) {

  var uploadersSubMenu = metadata.uploadHosts.map(function (host) {
    return {
      label: host.name,
      click: function () {
        appDispatch(appActions.uploadImage(image.getFilePath(), host.id));
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
        appDispatch(appActions.showImageInFolder(image.getFilePath()));
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
                appDispatch(appActions.captureDesktop());
              }
            },
            {
              label: 'Selection',
              click: function () {
                appDispatch(appActions.captureSelection());
              }
            },
            {
              type: 'separator'
            },
            {
              label: 'Import from clipboard',
              click: function () {
                appDispatch(appActions.importImageFromClipboard());
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
            appDispatch(appActions.showDialogToOpenImage());
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          click: function () {
            appDispatch(appActions.quitApp());
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
            appDispatch(appActions.openSettings());
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
