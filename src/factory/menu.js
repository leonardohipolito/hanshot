'use strict';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

exports.imageContext = function (dispatch, filePath) {
  return [
    {
      label: 'Copy',
      click: function () {
        dispatch({
          actionName: 'copy-image',
          filePath: filePath
        });
      }
    }
  ];
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
