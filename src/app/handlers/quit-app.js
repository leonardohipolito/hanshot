'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

import config from '../../config';
import * as fsHelper from '../../file';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  return function () {
    components.cache.set('gallery', components.gallery.serialize());
    // TODO: use promises or callbacks to make async writes
    // now cache and settings are saved synchronously (is it bad?)
    components.screen.destroy();
    components.settings.save();

    var cacheData = components.cache.toJSON();
    fsHelper.writeJSONSyncSafe(config.CACHE_PATH, cacheData);

    electron.app.quit();
  };

};
