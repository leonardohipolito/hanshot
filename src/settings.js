//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import _ from 'lodash';

import Storage from './storage';
import * as fsHelpers from './file';
import { SETTINGS_PATH } from './config';
import defaults from './config/default-settings';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Settings {

  constructor() {
    const defaultSettings = new Storage();
    const userSettings = new Storage();

    return {

      load() {
        defaultSettings.reset(defaults);

        const data = fsHelpers.readJSONSyncSafe(SETTINGS_PATH);
        userSettings.reset(data);
      },

      save() {
        const data = userSettings.toJSON();
        fsHelpers.writeJSONSyncSafe(SETTINGS_PATH, data);
      },

      set(key, value) {
        userSettings.set(key, value);
      },

      get(key, defaultValue) {
        if (userSettings.has(key)) {
          return userSettings.get(key);
        }
        return defaultSettings.get(key, defaultValue);
      },

      serialize() {
        return _.merge({}, defaultSettings.toJSON(), userSettings.toJSON());
      },

    };
  }

}
