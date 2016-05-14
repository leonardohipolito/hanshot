//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function quitAppHandler(cache, screen, settings, gallery) {
  return function quitApp() {
    cache.set('gallery', gallery.serialize());
    // TODO: use promises or callbacks to make async writes
    // now cache and settings are saved synchronously (is it bad?)
    screen.destroy();
    settings.save();
    cache.save();
    electron.app.quit();
  };
}

quitAppHandler.inject = ['cache', 'screen', 'settings', 'gallery'];
