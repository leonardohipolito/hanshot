'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

var Dispatcher = require('../dispatcher');
var Screen = require('../screen');
var Settings = require('../settings');
var Cache = require('../cache');
var Tray = require('../tray');
var Gallery = require('../image/gallery');
var windows = {
  Dashboard: require('../windows/dashboard'),
  Settings: require('../windows/settings'),
  Selection: require('../windows/selection')
};
var metadata = require('../config/metadata');
var createStore = require('../store');
var storeActions = require('../store/actions');
var appActions = require('./actions');
var handlers = [
  require('./handlers/app'),
  require('./handlers/capture'),
  require('./handlers/copy'),
  require('./handlers/file'),
  require('./handlers/menu'),
  require('./handlers/settings'),
  require('./handlers/shell'),
  require('./handlers/store'),
  require('./handlers/upload'),
  require('./handlers/window')
];

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function () {

  var components = {
    windows: {
      dashboard: new windows.Dashboard(),
      settings: new windows.Settings(),
      selection: new windows.Selection()
    },
    tray: new Tray(),
    settings: new Settings(),
    cache: new Cache(),
    screen: new Screen(),
    gallery: new Gallery(),
    store: createStore()
  };

  // Preload image

  components.gallery.reset(components.cache.get('gallery', []));

  // Handle events from app components

  var dispatcher = new Dispatcher();

  handlers.forEach(function (registerHandlers) {
    registerHandlers(dispatcher, components);
  });

  components.windows.dashboard.on('action', dispatcher.dispatch);
  components.windows.settings.on('action', dispatcher.dispatch);
  components.tray.on('action', dispatcher.dispatch);

  // Store

  components.store.subscribe(function () {
    components.windows.dashboard.sendState(components.store.getState());
    components.windows.settings.sendState(components.store.getState());
  });

  // Create data providers

  var fetchDisplays = function () {
    return storeActions.receiveDisplays(
      components.screen.getDisplayList()
    );
  };

  var fetchImage = function () {
    var image = components.gallery.getLast().load();
    return storeActions.receiveImage(image);
  };

  var fetchSettings = function () {
    return storeActions.receiveSettings(
      components.settings.serialize()
    );
  };

  var fetchMetadata = function () {
    return storeActions.receiveMetadata(metadata);
  };

  // Fill store with data on start

  components.store.dispatch(fetchDisplays());
  components.store.dispatch(fetchSettings());
  components.store.dispatch(fetchImage());
  components.store.dispatch(fetchMetadata());

  // Screen

  components.screen.on('display-added', function () {
    components.store.dispatch(fetchDisplays());
  });

  components.screen.on('display-removed', function () {
    components.store.dispatch(fetchDisplays());
  });

  components.screen.on('display-updated', function () {
    components.store.dispatch(fetchDisplays());
  });

  // Image loader

  components.gallery.on('added', function () {
    components.store.dispatch(fetchImage());
  });

  components.gallery.on('updated', function () {
    components.store.dispatch(fetchImage());
  });

  // Windows - dashboard

  if (components.settings.get('show-on-start')) {
    components.windows.dashboard.open();
    components.windows.dashboard.show();
  }

  components.windows.dashboard.on('ready', function () {
    components.windows.dashboard.sendState(
      components.store.getState()
    );
  });

  components.windows.dashboard.on('close', function () {
    if (components.settings.get('tray-on-close')) {
      cache.save();
      settings.save();
    } else {
      dispatcher.dispatch(appActions.appQuit());
    }
  });

  // Windows - settings

  components.windows.settings.on('ready', function () {
    components.windows.settings.sendState(
      components.store.getState()
    );
  });
  components.windows.settings.on('close', function () {
    components.settings.save();
  });

  // App public methods

  return {
    dispatch: dispatcher.dispatch
  };
};
