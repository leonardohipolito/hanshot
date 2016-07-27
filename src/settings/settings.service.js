//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Settings from './settings';
import JSONSource from '../json.source';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function settingsService(config) {
  const defaultSource = new JSONSource(config.DEFAULT_SETTINGS_PATH);
  const userSource = new JSONSource(config.SETTINGS_PATH);

  const settings = new Settings(defaultSource, userSource);

  return settings;
}

settingsService.inject = ['config'];
