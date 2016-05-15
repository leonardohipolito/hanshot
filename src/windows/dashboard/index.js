//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import actions from '../../actions';
import createWindow from '../../window.shim';
import createDashboardMenu from '../../menu/dashboard.menu';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function createDashboardWindow(dispatch, store, settings) {
  let window = null;

  const open = function open() {
    if (window) return;

    window = createWindow('dashboard');

    window.load(`file://${__dirname}/renderer/dashboard.html`);

    window.setMenu(createDashboardMenu(dispatch));

    window.on('close', () => {
      if (settings.get('tray-on-close')) {
        // TODO: Do things when window closes or implement action for it
        //       or just remove it from here
        // cache.save();
        // settings.save();
      } else {
        dispatch(actions.quitApp());
      }
    });

    const sendState = function sendState() {
      window.sendMessage('state-updated', store.getState());
    };

    window.onMessage('ready', sendState);
    store.subscribe(() => sendState);

    window.onMessage('action', (action) => {
      dispatch(action);
    });
  };

  if (settings.get('show-on-start')) {
    open();
  }

  return {
    open,
  };
}

createDashboardWindow.inject = ['dispatch', 'store', 'settings'];
