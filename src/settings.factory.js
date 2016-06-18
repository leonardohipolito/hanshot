//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Settings from './settings';
import JSONSource from './json.source';
import { SETTINGS_PATH } from './config';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function settingsFactory() {
  const defaultSettingsPath = `${__dirname}/config/default-settings.json`;

  const defaultSource = new JSONSource(defaultSettingsPath);
  const userSource = new JSONSource(SETTINGS_PATH);

  const settings = new Settings(defaultSource, userSource);

  settings.load();

  return settings;
}
