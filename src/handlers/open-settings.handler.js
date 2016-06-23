//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function openPreferencesHandler(preferencesWindow) {
  return function openPreferences() {
    preferencesWindow.show();
  };
}

openPreferencesHandler.inject = ['settingsWindow'];
