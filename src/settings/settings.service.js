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

  const promise = settings
    .load()
    .then(() => {
      // If auto-save is enabled, but directory is not selected, then use
      // user's default directory for pictires. It is set to null in default
      // settings, because this path to default directory only becomes
      // available at runtime
      if (settings.get('save-dir-selected') && !settings.get('save-dir-path')) {
        settings.set('save-dir-path', config.USER_PICTURES_PATH);
      }

      return settings;
    });

  return promise;
}

settingsService.inject = ['config'];
