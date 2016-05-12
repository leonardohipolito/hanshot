//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { receiveSettings } from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function settingsProvider(store, settings) {
  function fetchSettings() {
    return receiveSettings(settings.serialize());
  }

  return fetchSettings;
}

settingsProvider.inject = ['store', 'settings'];
