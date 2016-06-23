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
  const defaultSettingsPath = `${__dirname}/default.json`;

  const defaultSource = new JSONSource(defaultSettingsPath);
  const userSource = new JSONSource(config.SETTINGS_PATH);

  const settings = new Settings(defaultSource, userSource);

  settings.load();

  function fetchSettings() {
    store.dispatch(receiveSettings(settings.serialize()));
  }

  fetchSettings();

  return settings;
}

settingsProvider.inject = ['config', 'store'];
