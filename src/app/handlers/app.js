'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

var appActions = require('../actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  dispatcher.on(appActions.APP_QUIT, function () {
    components.cache.set('gallery', components.gallery.serialize());
    // TODO: use promises or callbacks to make async writes
    // now cache and settings are saved synchronously (is it bad?)
    components.screen.destroy();
    components.cache.save();
    components.settings.save();
    electron.app.quit();
  });

};
