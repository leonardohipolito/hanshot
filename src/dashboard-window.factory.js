//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import DashboardWindow from './windows/dashboard';
import createDashboardMenu from './menu/dashboard.menu';
import actions from './actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function dashboardWindowFactory(dispatch, store, settings, cache) {
  const dashboardWindow = new DashboardWindow();
  const dashboardMenu = createDashboardMenu(dispatch);

  // dashboardWindow.setMenu(dashboardMenu);

  dashboardWindow.on('ready', () => {
    dashboardWindow.sendState(store.getState());
  });

  dashboardWindow.on('action', (action) => {
    dispatch(action);
  });

  dashboardWindow.on('close', () => {
    if (settings.get('tray-on-close')) {
      // TODO: implement action for it or just remove it from here
      cache.save();
      settings.save();
    } else {
      dispatch(actions.quitApp());
    }
  });

  store.subscribe(() => {
    dashboardWindow.sendState(store.getState());
  });

  if (settings.get('show-on-start')) {
    dashboardWindow.open();
  }
}

dashboardWindowFactory.inject = ['dispatch', 'store', 'settings', 'cache'];
