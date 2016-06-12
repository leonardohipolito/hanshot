//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import log from './log';

import Container from './container';
import Dispatcher from './dispatcher';

import cacheFactory from './cache.factory';
import settingsFactory from './settings.factory';
import storeFactory from './store.factory';
import galleryFactory from './gallery.factory';
import dashboardWindowFactory from './dashboard-window.factory';
import trayFactory from './tray.factory';

// var Screen = require('./screen');
// var Selection = require('./selection');

import trayMenuFactory from './menu/tray.menu';
import dashboardMenuFactory from './menu/dashboard.menu';

// TODO: maybe rethink metadata
import metadata from './config/metadata';

import * as types from './actions';

import openDashboardHandler from './handlers/open-dashboard.handler';
import quitAppHandler from './handlers/quit-app.handler';

import metadataProvider from './store/providers/metadata.provider';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class App {

  constructor() {
    this.container = new Container();
    this.dispatcher = new Dispatcher();

    this.dispatch = this.dispatcher.dispatch.bind(this.dispatcher);

    this.register();
    this.registerHandlers();
    this.registerProviders();
  }

  register() {
    // Order matters

    this.container.registerValue('dispatch', this.dispatch);

    this.container.registerValues({
      metadata,
    });

    this.container.registerFactories({
      trayMenu: trayMenuFactory,
      dashboardMenu: dashboardMenuFactory,
    });

    this.container.registerFactories({
      cache: cacheFactory,
      settings: settingsFactory,
      gallery: galleryFactory,
      store: storeFactory,
      dashboardWindow: dashboardWindowFactory,
      tray: trayFactory,
    });
  }

  registerHandlers() {
    const handlers = {
      [types.OPEN_DASHBOARD]: openDashboardHandler,
      [types.QUIT_APP]: quitAppHandler,
    };

    Object.keys(handlers).forEach((type) => {
      const registerName = `handler:${type}`;
      const handlerFactory = handlers[type];

      this.container.registerFactory(registerName, handlerFactory);

      this.dispatcher.on(type, this.container.get(registerName));
    });
  }

  registerProviders() {
    const providers = {
      metadata: metadataProvider,
    };

    Object.keys(providers).forEach((name) => {
      const registerName = `provider:${name}`;
      const providerFactory = providers[name];

      this.container.registerFactory(registerName, providerFactory);

      const provide = this.container.get(registerName);
      provide();
    });
  }

  start() {
    // Instantiate all registered modules
    this.container.instantiate();
    log('started i guess');
  }

}

// const components = {
//   windows: {},
//   selection: new Selection(),
//   settings,
//   cache,
//   screen: new Screen(),
//   gallery: new Gallery(),
//   store: new Store(),
//   metadata,
// };

// // Load cache

// components.cache.load();
// components.settings.load();

// // Preload image

// components.gallery.reset(components.cache.get('gallery', []));

// // Create dependency container

// const dispatcher = createDispatcher();

// const container = createContainer();

// container.registerValues({
//   dispatch: dispatcher.dispatch,

//   cache: components.cache,
//   settings: components.settings,
//   screen: components.screen,
//   gallery: components.gallery,
//   store: components.store,
//   metadata: components.metadata,
// });

// // Windows

// components.windows.dashboard = createDashboardWindow(
//   ...container.pick(createDashboardWindow.inject)
// );
// container.registerValue('dashboardWindow', components.windows.dashboard);

// components.windows.settings = createSettingsWindow(
//   ...container.pick(createSettingsWindow.inject)
// );
// container.registerValue('settingsWindow', components.windows.settings);

// // Tray

// components.tray = createAppTray(dispatcher.dispatch);

// // Handle events from app components

// log('Registering handlers...');

// appActionTypes.forEach((type) => {
//   const handlerCreator = handlers[type];
//   if (!handlerCreator) {
//     log('No handler found for type "%s"', type);
//     return;
//   }

//   const dependencyNames = handlerCreator.inject || [];
//   const dependencies = container.pick(dependencyNames);

//   dependencies.forEach((dep, index) => {
//     if (dep === undefined) {
//       log('Dependency not satisfied for "%s"', dependencyNames[index]);
//     }
//   });

//   const handler = handlerCreator(...dependencies);

//   dispatcher.on(type, handler);
// });

// // Store

// log('Registering providers...');


// storeProviders.forEach((registerStoreProvider) => {
//   const dependencyNames = registerStoreProvider.inject || [];
//   const dependencies = container.pick(dependencyNames);

//   dependencies.forEach((dep, index) => {
//     if (dep === undefined) {
//       log('Dependency not satisfied for "%s"', dependencyNames[index]);
//     }
//   });

//   const prefetchProviderAction = registerStoreProvider(...dependencies);
//   components.store.dispatch(prefetchProviderAction());
// });

// App public methods

// return {
// dispatch,
// };
// }
