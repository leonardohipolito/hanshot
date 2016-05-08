//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Dispatcher from './dispatcher';
import Container from './container';

import { default as appActions, types as appActionTypes } from './actions';
import * as handlers from './handlers';

import Cache from './cache';
import Settings from './settings';

var Screen = require('./screen');
var Tray = require('./tray');
var Gallery = require('./image/gallery');
var Selection = require('./selection');
var windows = {
  Dashboard: require('./windows/dashboard'),
  Settings: require('./windows/settings'),
};
var metadata = require('./config/metadata');
var createStore = require('./store');
var storeActions = require('./store/actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class App {

  constructor() {
    const components = {
      windows: {
        dashboard: new windows.Dashboard(),
        settings: new windows.Settings(),
      },
      selection: new Selection(),
      tray: new Tray(),
      settings: new Settings(),
      cache: new Cache(),
      screen: new Screen(),
      gallery: new Gallery(),
      store: createStore(),
    };

    // Load cache

    components.cache.load();
    components.settings.load();

    // Preload image

    components.gallery.reset(components.cache.get('gallery', []));

    // Create dependency container

    const dispatcher = new Dispatcher();

    const container = new Container();

    container.register({
      dispatch: dispatcher.dispatch,

      cache: components.cache,
      settings: components.settings,
      screen: components.screen,
      gallery: components.gallery,

      dashboardWindow: components.windows.dashboard,
      selectionWindow: components.windows.selection,
    });

    // Handle events from app components

    appActionTypes.forEach((type) => {
      const handlerCreator = handlers[type];
      if (!handlerCreator) {
        console.log('No handler found for type "%s"', type);
        return;
      }

      const dependencyNames = handlerCreator.inject || [];
      const dependencies = container.get(dependencyNames);

      dependencies.forEach((dep, index) => {
        if (dep === undefined) {
          console.log('Dependency not satisfied for "%s"', dependencyNames[index]);
        }
      });

      const handler = handlerCreator.create(...dependencies);

      dispatcher.on(type, handler);
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
      var image = components.gallery.getLast();
      if (image) {
        return storeActions.receiveImage(image.load());
      } else {
        return storeActions.receiveImage(null);
      }
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
        components.cache.save();
        components.settings.save();
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
      dispatch: dispatcher.dispatch,
    };
  }
}
