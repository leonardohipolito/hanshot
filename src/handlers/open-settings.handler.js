//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function openPreferencesHandler(preferencesWindow) {
  return function openPreferences() {
    preferencesWindow.open();
  };
}

openPreferencesHandler.inject = ['settingsWindow'];
