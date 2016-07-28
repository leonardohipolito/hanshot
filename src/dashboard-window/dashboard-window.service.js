//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import DashboardWindow from './dashboard-window';
import * as actions from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function dashboardWindowService(
  dashboardWindowMenuFactory, dispatch, store, settings, cache
) {
  let dashboardWindow = null;

  function open() {
    if (dashboardWindow !== null) return dashboardWindow;

    dashboardWindow = new DashboardWindow();
    dashboardWindow.setMenu(dashboardWindowMenuFactory());

    dashboardWindow.onMessage('ready', () => {
      dashboardWindow.sendState(store.getState());
    });

    dashboardWindow.onMessage('action', (action) => {
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
      dashboardWindow = null;
    });

    store.subscribe(() => {
      dashboardWindow.sendState(store.getState());
    });

    return dashboardWindow;
  }

  function show() {
    if (dashboardWindow === null) {
      open();
    } else {
      dashboardWindow.show();
    }
  }

  function hide() {
    if (dashboardWindow !== null) {
      dashboardWindow.hide();
    }
  }

  if (settings.get('show-on-start')) {
    open();
  }

  return {
    open,
    show,
    hide,
  };
}

dashboardWindowService.inject = [
  'dashboardWindowMenuFactory', 'dispatch', 'store', 'settings', 'cache',
];
