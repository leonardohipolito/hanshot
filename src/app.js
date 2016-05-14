//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Dispatcher from './dispatcher';
import Container from './container';

import { default as appActions, types as appActionTypes } from './actions';
import * as handlers from './handlers';

import Cache from './cache';
import Settings from './settings';
import Store from './store';
import storeProviders from './store/providers';

// TODO: maybe rethink metadata
import metadata from './config/metadata';

import createAppTray from './tray';


var Screen = require('./screen');
var Gallery = require('./image/gallery');
var Selection = require('./selection');
var windows = {
  Dashboard: require('./windows/dashboard'),
  Settings: require('./windows/settings'),
};

import log from './log';

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
      settings: new Settings(),
      cache: new Cache(),
      screen: new Screen(),
      gallery: new Gallery(),
      store: new Store(),
      metadata,
    };

    // Load cache

    components.cache.load();
    components.settings.load();

    // Preload image

    components.gallery.reset(components.cache.get('gallery', []));

    // Create dependency container

    const dispatcher = new Dispatcher();

    const container = new Container();

    container.registerValues({
      dispatch: dispatcher.dispatch,

      cache: components.cache,
      settings: components.settings,
      screen: components.screen,
      gallery: components.gallery,
      store: components.store,
      metadata: components.metadata,

      dashboardWindow: components.windows.dashboard,
      selectionWindow: components.windows.selection,
    });

    // Handle events from app components

    log('Registering handlers...');

    appActionTypes.forEach((type) => {
      const handlerCreator = handlers[type];
      if (!handlerCreator) {
        log('No handler found for type "%s"', type);
        return;
      }

      const dependencyNames = handlerCreator.inject || [];
      const dependencies = container.pick(dependencyNames);

      dependencies.forEach((dep, index) => {
        if (dep === undefined) {
          log('Dependency not satisfied for "%s"', dependencyNames[index]);
        }
      });

      const handler = handlerCreator(...dependencies);

      dispatcher.on(type, handler);
    });

    components.windows.dashboard.on('action', dispatcher.dispatch);
    components.windows.settings.on('action', dispatcher.dispatch);

    // Tray

    components.tray = createAppTray(dispatcher.dispatch);

    // Store

    components.store.subscribe(() => {
      components.windows.dashboard.sendState(components.store.getState());
      components.windows.settings.sendState(components.store.getState());
    });

    log('Registering providers...');


    storeProviders.forEach((registerStoreProvider) => {
      const dependencyNames = registerStoreProvider.inject || [];
      const dependencies = container.pick(dependencyNames);

      dependencies.forEach((dep, index) => {
        if (dep === undefined) {
          log('Dependency not satisfied for "%s"', dependencyNames[index]);
        }
      });

      const prefetchProviderAction = registerStoreProvider(...dependencies);
      components.store.dispatch(prefetchProviderAction());
    });

    // Windows - dashboard

    if (components.settings.get('show-on-start')) {
      components.windows.dashboard.open();
      components.windows.dashboard.show();
    }

    components.windows.dashboard.on('ready', () => {
      components.windows.dashboard.sendState(
        components.store.getState()
      );
    });

    components.windows.dashboard.on('close', () => {
      if (components.settings.get('tray-on-close')) {
        components.cache.save();
        components.settings.save();
      } else {
        dispatcher.dispatch(appActions.quitApp());
      }
    });

    // Windows - settings

    components.windows.settings.on('ready', () => {
      components.windows.settings.sendState(
        components.store.getState()
      );
    });
    components.windows.settings.on('close', () => {
      components.settings.save();
    });

    // App public methods

    return {
      dispatch: dispatcher.dispatch,
    };
  }
}
