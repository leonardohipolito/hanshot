'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

var _ = require('lodash');

import Cache from '../cache';
import * as fsHelper from '../file';

var Dispatcher = require('../dispatcher');
var Screen = require('../screen');
var Settings = require('../settings');
var Tray = require('../tray');
var Gallery = require('../image/gallery');
var windows = {
  Dashboard: require('../windows/dashboard'),
  Settings: require('../windows/settings'),
  Selection: require('../windows/selection')
};
var config = require('../config');
var metadata = require('../config/metadata');
var createStore = require('../store');
var storeActions = require('../store/actions');
var appActions = require('./actions');

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

  // Load cache

  var cacheData = fsHelper.readJSONSyncSafe(config.CACHE_PATH);
  components.cache.reset(cacheData);

  // Preload image

  components.gallery.reset(components.cache.get('gallery', []));

  // Handle events from app components

  var dispatcher = new Dispatcher();

  Object.keys(appActions).forEach(function (actionMethodName) {

    var actionCreator = appActions[actionMethodName];
    var action = actionCreator();

    var handlerFileName = action.handler;
    var handlerCreator = require('./handlers/' + handlerFileName);

    var handler = handlerCreator(dispatcher, components);

    dispatcher.on(action.handler, handler);
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

      var cacheData = components.cache.toJSON();
      fsHelper.writeJSONSyncSafe(config.CACHE_PATH, cacheData);

      settings.save();

    } else {
      dispatcher.dispatch(appActions.quitApp());
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
