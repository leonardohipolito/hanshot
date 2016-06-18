//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import log from './log';
import * as config from './config';

import Container from './container';
import Dispatcher from './dispatcher';

import storeFactory from './store.factory';
import cacheFactory from './cache.factory';
import settingsFactory from './settings.factory';

import Screen from './screen';
// var Selection = require('./selection');
// var Screen = require('./screen');

import trayMenuFactory from './menu/tray.menu';
import dashboardMenuFactory from './menu/dashboard.menu';

import metadataFactory from './metadata.factory';
import galleryFactory from './gallery.factory';
import trayFactory from './tray.factory';
import dashboardWindowFactory from './dashboard-window.factory';
import savePathFactoryProvider from './save-path-factory.provider';

import * as types from './actions';

import captureDesktopHandler from './handlers/capture-desktop.handler';
import openDashboardHandler from './handlers/open-dashboard.handler';
import quitAppHandler from './handlers/quit-app.handler';
import saveImageHandler from './handlers/save-image.handler';
import importImageFromClipbobard from './handlers/import-image-from-clipboard.handler.js';

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
  }

  register() {
    // Order matters
    // TODO: move things to different containers to be safe from bad injections

    this.container.registerValue('dispatch', this.dispatch);
    this.container.registerValue('config', config);

    this.container.registerFactories({
      store: storeFactory,
      cache: cacheFactory,
      settings: settingsFactory,
    });

    this.container.registerClass('screen', Screen);

    this.container.registerFactories({
      trayMenu: trayMenuFactory,
      dashboardMenu: dashboardMenuFactory,
    });

    this.container.registerFactories({
      metadata: metadataFactory,
      gallery: galleryFactory,
      dashboardWindow: dashboardWindowFactory,
      tray: trayFactory,
      savePathFactory: savePathFactoryProvider,
    });
  }

  registerHandlers() {
    const handlers = {
      [types.CAPTURE_DESKTOP]: captureDesktopHandler,
      [types.OPEN_DASHBOARD]: openDashboardHandler,
      [types.QUIT_APP]: quitAppHandler,
      [types.SAVE_IMAGE]: saveImageHandler,
      [types.IMPORT_IMAGE_FROM_CLIPBOARD]: importImageFromClipbobard,
    };

    Object.keys(handlers).forEach((type) => {
      const registerName = `handler:${type}`;
      const handlerFactory = handlers[type];

      this.container.registerFactory(registerName, handlerFactory);

      this.dispatcher.on(type, this.container.get(registerName));
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
