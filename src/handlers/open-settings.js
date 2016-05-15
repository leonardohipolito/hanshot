//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function openSettingsHandler(settingsWindow) {
  return function openSettings() {
    settingsWindow.open();
  };
}

openSettingsHandler.inject = ['settingsWindow'];
