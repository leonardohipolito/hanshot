//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import electron from 'electron';

import log from '../log';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function quitAppHandler(cache, screen, settings, gallery) {
  return function quitApp() {
    // Save info about images to cache
    const items = gallery.all();
    const cacheItems = items.map((item) => ({
      filePath: item.filePath,
      publicUrls: item.publicUrls,
    }));
    cache.set('gallery', cacheItems);

    // Delayed promise execution
    // https://github.com/electron/electron/issues/6123
    Promise.all([
      cache.save(),
      settings.save(),
    ])
    .then(() => {
      log('quited i guess');
      screen.destroy();
      electron.app.quit();
    })
    .catch((err) => {
      log('failed to quit');
      log(err);
    });
  };
}

quitAppHandler.inject = ['cache', 'screen', 'settings', 'gallery'];
