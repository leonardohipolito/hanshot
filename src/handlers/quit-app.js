//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default {

  inject: ['cache', 'screen', 'settings', 'gallery'],

  create(cache, screen, settings, gallery) {
    return function quitAppHandler() {
      cache.set('gallery', gallery.serialize());
      // TODO: use promises or callbacks to make async writes
      // now cache and settings are saved synchronously (is it bad?)
      screen.destroy();
      settings.save();
      cache.save();
      electron.app.quit();
    };
  },

};
