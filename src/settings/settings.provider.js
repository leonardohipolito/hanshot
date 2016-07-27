//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Settings from './settings';
import JSONSource from '../json.source';
import { receiveSettings } from '../store/actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function settingsProvider(config, store) {
  const defaultSource = new JSONSource(config.DEFAULT_SETTINGS_PATH);
  const userSource = new JSONSource(config.SETTINGS_PATH);

  const settings = new Settings(defaultSource, userSource);

  function fetchSettings() {
    store.dispatch(receiveSettings(settings.serialize()));
  }

  settings.on('load', fetchSettings);
  fetchSettings();

  return settings;
}

settingsProvider.inject = ['config', 'store'];
