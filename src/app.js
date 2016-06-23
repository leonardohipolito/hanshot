//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import log from './log';

import * as config from './config';

import Container from './container';
import Dispatcher from './dispatcher';

import storeProvider from './store/store.provider';
import cacheProvider from './cache/cache.provider';
import settingsProvider from './settings/settings.provider';

import Screen from './screen';
// var Selection = require('./selection');
// var Screen = require('./screen');

import trayMenu from './tray/tray.menu';
import dashboardWindowMenu from './dashboard-window/dashboard-window.menu';
import settingsWindowMenu from './settings-window/settings-window.menu';

import metadataFactory from './metadata.factory';
import galleryFactory from './gallery.factory';
import savePathFactoryProvider from './save-path-factory.provider';
import uploaderFactoryProvider from './uploader-factory.provider';
import trayProvider from './tray/tray.provider';
import dashboardWindowProvider from './dashboard-window/dashboard-window.provider';
import settingsWindowProvider from './settings-window/settings-window.provider';

import * as types from './actions';

import authorizeUploaderHandler from './handlers/authorize-uploader.handler';
import captureDesktopHandler from './handlers/capture-desktop.handler';
import closeAlertHandler from './handlers/close-alert.handler';
import copyImageHandler from './handlers/copy-image.handler';
import copyTextHandler from './handlers/copy-text.handler';
import importImageFromClipbobard from './handlers/import-image-from-clipboard.handler.js';
import openDashboardHandler from './handlers/open-dashboard.handler';
import openSettingsHandler from './handlers/open-settings.handler';
import quitAppHandler from './handlers/quit-app.handler';
import saveImageHandler from './handlers/save-image.handler';
import showAlertHandler from './handlers/show-alert.handler';
import showDialogToOpenImageHandler from './handlers/show-dialog-to-open-image.handler';
import updateSettingHandler from './handlers/update-setting.handler';
import uploadImageHandler from './handlers/upload-image.handler.js';

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
      store: storeProvider,
      cache: cacheProvider,
      settings: settingsProvider,
    });

    this.container.registerClass('screen', Screen);

    this.container.registerFactories({
      trayMenu,
      dashboardWindowMenu,
      settingsWindowMenu,
    });

    this.container.registerFactories({
      metadata: metadataFactory,
      gallery: galleryFactory,
      savePathFactory: savePathFactoryProvider,
      uploaderFactory: uploaderFactoryProvider,
      tray: trayProvider,
      dashboardWindow: dashboardWindowProvider,
      settingsWindow: settingsWindowProvider,
    });
  }

  registerHandlers() {
    const handlers = {
      [types.AUTHORIZE_UPLOADER]: authorizeUploaderHandler,
      [types.CAPTURE_DESKTOP]: captureDesktopHandler,
      [types.CLOSE_ALERT]: closeAlertHandler,
      [types.COPY_IMAGE]: copyImageHandler,
      [types.COPY_TEXT]: copyTextHandler,
      [types.IMPORT_IMAGE_FROM_CLIPBOARD]: importImageFromClipbobard,
      [types.OPEN_DASHBOARD]: openDashboardHandler,
      [types.OPEN_SETTINGS]: openSettingsHandler,
      [types.QUIT_APP]: quitAppHandler,
      [types.SAVE_IMAGE]: saveImageHandler,
      [types.SHOW_ALERT]: showAlertHandler,
      [types.SHOW_DIALOG_TO_OPEN_IMAGE]: showDialogToOpenImageHandler,
      [types.UPDATE_SETTING]: updateSettingHandler,
      [types.UPLOAD_IMAGE]: uploadImageHandler,
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
