//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import createWindow from '../../window.shim';
import createSettingsMenu from '../../menu/settings.menu';

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

export default function createSettingsWindow(dispatch, store, settings) {
  let window = null;

  const open = function open() {
    if (window) return;

    window = createWindow('settings');

    window.load(`file://${__dirname}/renderer/settings.html`);

    window.setMenu(createSettingsMenu());

    window.on('close', () => {
      // TODO: implement action for it or just remove it from here
      settings.save();
      window = null;
    });

    const sendState = function sendState() {
      window.sendMessage('state-updated', store.getState());
    };

    // TODO: unsubscribe
    window.onMessage('ready', sendState);
    store.subscribe(sendState);

    window.onMessage('action', (action) => {
      dispatch(action);
    });
  };

  return {
    open,
  };
}

createSettingsWindow.inject = ['dispatch', 'store', 'settings'];
