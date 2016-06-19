//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function createSettingsMenu() {
  return [
    {
      label: 'File',
      submenu: [
        {
          label: 'Close',
          role: 'close',
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
