//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import DashboardWindow from './windows/dashboard';
import * as actions from './actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function dashboardWindowFactory(
  dashboardMenu, dispatch, store, settings, cache
) {
  let dashboardWindow = null;

  function open() {
    if (dashboardWindow !== null) return dashboardWindow;

    dashboardWindow = new DashboardWindow();
    dashboardWindow.setMenu(dashboardMenu);

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
    });

    dashboardWindow.on('destroy', () => {
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

dashboardWindowFactory.inject = [
  'dashboardMenu', 'dispatch', 'store', 'settings', 'cache',
];
