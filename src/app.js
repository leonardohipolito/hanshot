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

// TODO: maybe rethink metadata
import metadata from './config/metadata';


// import { types as appActionTypes } from './actions';
// import * as handlers from './handlers';

// import Store from './store';
// import storeProviders from './store/providers';

// import createAppTray from './tray';

// import createDashboardWindow from './windows/dashboard';
// import createSettingsWindow from './windows/settings';

// var Screen = require('./screen');
// var Selection = require('./selection');


//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function createApp() {
  const container = new Container();

  const dispatcher = new Dispatcher();
  const dispatch = dispatcher.dispatch.bind(dispatcher);

  container.registerValues({
    dispatch,
    metadata,
  });

  // Order matters
  container.registerFactories({
    cache: cacheFactory,
    settings: settingsFactory,
    gallery: galleryFactory,
    store: storeFactory,
    dashboardWindow: dashboardWindowFactory,
  });

  // Instantiate all registered modules
  container.instantiate();

  log('started i guess');

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

  return {
    dispatch,
  };
}
