//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import actions from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function createDashboardMenu(dispatch) {
  return [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          submenu: [
            {
              label: 'Desktop',
              click() {
                dispatch(actions.captureDesktop());
              },
            },
            {
              label: 'Selection',
              click() {
                dispatch(actions.captureSelection());
              },
            },
            {
              type: 'separator',
            },
            {
              label: 'Import from clipboard',
              click() {
                dispatch(actions.importImageFromClipboard());
              },
            },
          ],
        },
        {
          type: 'separator',
        },
        {
          label: 'Open...',
          click() {
            dispatch(actions.showDialogToOpenImage());
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Quit',
          click() {
            dispatch(actions.quitApp());
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Settings',
          click() {
            dispatch(actions.openSettings());
          },
        },
      ],
    },
    // TODO: shim calls to focusedWindow or implement actions
    {
      label: 'Developer',
      submenu: [
        {
          label: 'Open dev tools',
          click(item, focusedWindow) {
            focusedWindow.webContents.openDevTools();
          },
        },
        {
          label: 'Reload',
          click(item, focusedWindow) {
            focusedWindow.reload();
          },
        },
      ],
    },
  ];
}
