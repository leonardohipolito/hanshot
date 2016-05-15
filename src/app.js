//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Dispatcher from './dispatcher';
import Container from './container';

import { types as appActionTypes } from './actions';
import * as handlers from './handlers';

import Cache from './cache';
import Settings from './settings';
import Store from './store';
import storeProviders from './store/providers';

// TODO: maybe rethink metadata
import metadata from './config/metadata';

import createAppTray from './tray';

import createDashboardWindow from './windows/dashboard';

var Screen = require('./screen');
var Gallery = require('./image/gallery');
var Selection = require('./selection');
var windows = {
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
    });

    // Windows

    components.windows.dashboard = createDashboardWindow(...container.pick(createDashboardWindow.inject));

    container.registerValue('dashboardWindow', components.windows.dashboard);

    // Tray

    components.tray = createAppTray(dispatcher.dispatch);

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

    components.windows.settings.on('action', dispatcher.dispatch);



    // Store

    components.store.subscribe(() => {
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
