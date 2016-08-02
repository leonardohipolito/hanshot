//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import log from './log';

import * as config from './config';
import * as metadata from './metadata/metadata';

import Container from './container/container';
import Dispatcher from './dispatcher';

import storeService from './store/store.service';
import cacheService from './cache/cache.service';
import settingsService from './settings/settings.service';

import Screen from './screen';

import trayMenuFactory from './tray/tray-menu.factory';
import dashboardWindowMenuFactory from './dashboard/dashboard-window-menu.factory';
import contextMenuFactory from './context-menu.factory';

import galleryService from './gallery/gallery.service';
import savePathFactoryProvider from './save-path.factory';
import uploaderFactoryProvider from './uploaders/uploader.factory';
import trayService from './tray/tray.service';
import dashboardWindowService from './dashboard/dashboard-window.service';
import selectionWindowService from './selection/selection-window.service';

import settingsProvider from './settings/settings.provider';
import imageProvider from './gallery/image.provider';
import metadataProvider from './metadata/metadata.provider';

import * as types from './actions';

import authorizeUploaderHandler from './handlers/authorize-uploader.handler';
import captureDesktopHandler from './handlers/capture-desktop.handler';
import captureSelectionHandler from './handlers/capture-selection.handler';
import closeAlertHandler from './handlers/close-alert.handler';
import copyImageHandler from './handlers/copy-image.handler';
import copyTextHandler from './handlers/copy-text.handler';
import importImageFromClipbobard from './handlers/import-image-from-clipboard.handler.js';
import openDashboardHandler from './handlers/open-dashboard.handler';
import openImageContextMenuHandler from './handlers/open-image-context-menu.handler';
import openSettingsHandler from './handlers/open-settings.handler';
import quitAppHandler from './handlers/quit-app.handler';
import saveImageHandler from './handlers/save-image.handler';
import showAlertHandler from './handlers/show-alert.handler';
import showDialogToOpenImageHandler from './handlers/show-dialog-to-open-image.handler';
import showDialogToPickSaveDirHandler from './handlers/show-dialog-to-pick-save-dir.handler';
import showImageInFolderHandler from './handlers/show-image-in-folder.handler';
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
    this.registerProviders();
    this.registerHandlers();
  }

  register() {
    // Order matters
    // TODO: move things to different containers to be safe from bad injections

    this.container.registerValue('dispatch', this.dispatch);
    this.container.registerValue('config', config);
    this.container.registerValue('metadata', metadata);

    log('CACHE PATH: %s', config.CACHE_PATH);
    log('SETTINGS PATH: %s', config.SETTINGS_PATH);

    this.container.registerFactories({
      store: storeService,
      cache: cacheService,
      settings: settingsService,
    });

    this.container.registerConstructor('screen', Screen);

    this.container.registerFactories({
      trayMenuFactory,
      dashboardWindowMenuFactory,
      contextMenuFactory,
    });

    this.container.registerFactories({
      gallery: galleryService,
      savePathFactory: savePathFactoryProvider,
      uploaderFactory: uploaderFactoryProvider,
      tray: trayService,
      dashboardWindow: dashboardWindowService,
      selectionWindow: selectionWindowService,
    });
  }

  registerProviders() {
    const providers = {
      settings: settingsProvider,
      image: imageProvider,
      metadata: metadataProvider,
    };

    Object.keys(providers).forEach((type) => {
      const registerName = `provider:${type}`;
      const providerFactory = providers[type];

      this.container.registerFactory(registerName, providerFactory);
    });
  }

  registerHandlers() {
    const handlers = {
      [types.AUTHORIZE_UPLOADER]: authorizeUploaderHandler,
      [types.CAPTURE_DESKTOP]: captureDesktopHandler,
      [types.CAPTURE_SELECTION]: captureSelectionHandler,
      [types.CLOSE_ALERT]: closeAlertHandler,
      [types.COPY_IMAGE]: copyImageHandler,
      [types.COPY_TEXT]: copyTextHandler,
      [types.IMPORT_IMAGE_FROM_CLIPBOARD]: importImageFromClipbobard,
      [types.OPEN_DASHBOARD]: openDashboardHandler,
      [types.OPEN_IMAGE_CONTEXT_MENU]: openImageContextMenuHandler,
      [types.OPEN_SETTINGS]: openSettingsHandler,
      [types.QUIT_APP]: quitAppHandler,
      [types.SAVE_IMAGE]: saveImageHandler,
      [types.SHOW_ALERT]: showAlertHandler,
      [types.SHOW_DIALOG_TO_OPEN_IMAGE]: showDialogToOpenImageHandler,
      [types.SHOW_DIALOG_TO_PICK_SAVE_DIR]: showDialogToPickSaveDirHandler,
      [types.SHOW_IMAGE_IN_FOLDER]: showImageInFolderHandler,
      [types.UPDATE_SETTING]: updateSettingHandler,
      [types.UPLOAD_IMAGE]: uploadImageHandler,
    };

    Object.keys(handlers).forEach((type) => {
      const registerName = `handler:${type}`;
      const handlerFactory = handlers[type];

      this.container.registerFactory(registerName, handlerFactory);

      this.container
        .get(registerName)
        .then(handler => this.dispatcher.on(type, handler));
    });
  }

  start() {
    // Instantiate all registered modules, which were not instantiated yet
    this.container
      .instantiate()
      .then(() => log('started i guess'))
      .catch((err) => {
        log('failed to start i guess');
        log(err);
      });
  }

}
