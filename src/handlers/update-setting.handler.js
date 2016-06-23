//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as storeActions from '../store/actions';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

export default function updateSettingHandler(settings, store) {
  return function updateSetting(key, value) {
    // TODO: make settings fire an event on change
    settings.set(key, value);
    store.dispatch(storeActions.updateSetting(key, value));
  };
}

updateSettingHandler.inject = ['settings', 'store'];
