'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var metadata = require('../config/metadata');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

exports.imageContext = function (dispatch, image) {

  var uploadersSubMenu = metadata.uploadHosts.map(function (host) {
    return {
      label: host.name,
      click: function () {
        dispatch({
          actionName: 'upload',
          uploaderId: host.id,
          filePath: image.filePath
        });
      }
    };
  });

  var publicUrlsSubMenu = image.publicUrls.map(function (publicUrl) {
    return {
      label: publicUrl,
      click: function () {
        dispatch({
          actionName: 'copy-text',
          text: publicUrl
        });
      }
    };
  });

  var template = [
    {
      label: 'Show in folder',
      click: function () {
        dispatch({
          actionName: 'open-directory',
          filePath: image.filePath
        })
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
      label: 'Copy',
      click: function () {
        dispatch({
          actionName: 'copy-image',
          filePath: image.filePath
        });
      }
    }
  ]);

  return template;
};

exports.dashboard = function (dispatch) {
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
                dispatch({ actionName: 'capture-desktop' });
              }
            },
            {
              label: 'Selection',
              click: function () {
                dispatch({ actionName: 'capture-selection' });
              }
            },
            {
              type: 'separator'
            },
            {
              label: 'Import from clipboard',
              click: function () {
                dispatch({ actionName: 'import-clipboard' });
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
            dispatch({ actionName: 'import-open' });
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Save as...',
          click: function () {
            dispatch({ actionName: 'save-as' });
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          click: function () {
            dispatch({ actionName: 'force-quit' });
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
            dispatch({ actionName: 'open-settings' });
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
