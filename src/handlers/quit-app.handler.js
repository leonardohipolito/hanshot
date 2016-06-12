//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function quitAppHandler(cache, /* screen,*/ settings, gallery) {
  return function quitApp() {
    // Save info about images to cache
    const items = gallery.all();
    const cacheItems = items.map((item) => ({
      filePath: item.filePath,
      publicUrls: item.publicUrls,
    }));
    cache.set('gallery', cacheItems);

    // screen.destroy();
    // TODO: use promises or callbacks to make async writes
    // now cache and settings are saved synchronously (is it bad?)
    settings.save();
    cache.save();
    electron.app.quit();
  };
}

quitAppHandler.inject = ['cache', /* 'screen',*/ 'settings', 'gallery'];
