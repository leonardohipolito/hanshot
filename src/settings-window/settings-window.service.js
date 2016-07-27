//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import SettingsWindow from './settings-window.js';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function settingsWindowService(
  settingsWindowMenuFactory, dispatch, store, settings
) {
  let settingsWindow = null;

  function open() {
    if (settingsWindow !== null) {
      return settingsWindow;
    }

    settingsWindow = new SettingsWindow();
    settingsWindow.setMenu(settingsWindowMenuFactory());

    settingsWindow.onMessage('ready', () => {
      settingsWindow.sendState(store.getState());
    });

    settingsWindow.onMessage('action', (action) => {
      dispatch(action);
    });

    settingsWindow.on('close', () => {
      // TODO: implement action for it or just remove it from here
      settings.save();
      // TODO: close vs destroy
      settingsWindow = null;
    });

    settingsWindow.on('destroy', () => {
      settingsWindow = null;
    });

    store.subscribe(() => {
      settingsWindow.sendState(store.getState());
    });

    return settingsWindow;
  }

  function show() {
    if (settingsWindow === null) {
      open();
    } else {
      settingsWindow.show();
    }
  }

  return {
    open,
    show,
  };
}

settingsWindowService.inject = [
  'settingsWindowMenuFactory', 'dispatch', 'store', 'settings',
];
