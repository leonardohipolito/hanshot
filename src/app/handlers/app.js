'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  dispatcher.on('force-quit', function () {
    var cachedImage = components.imageLoader.getImage();
    if (cachedImage) {
        var cachedGallery = components.cache.get('gallery', []);
        cachedGallery.push(cachedImage);
        components.cache.set('gallery', cachedGallery);
    }
    // TODO: use promises or callbacks to make async writes
    // now cache and settings are saved synchronously (is it bad?)
    components.imageLoader.destroy();
    components.screen.destroy();
    components.cache.save();
    components.settings.save();
    electron.app.quit();
  });

};
