//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Settings from './settings';
import JSONSource from '../json.source';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function settingsProvider(config) {
  const defaultSettingsPath = `${__dirname}/default.json`;

  const defaultSource = new JSONSource(defaultSettingsPath);
  const userSource = new JSONSource(config.SETTINGS_PATH);

  const settings = new Settings(defaultSource, userSource);

  settings.load();

  return settings;
}

settingsProvider.inject = ['config'];
