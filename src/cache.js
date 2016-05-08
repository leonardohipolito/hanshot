//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Storage from './storage';
import { CACHE_PATH } from './config';
import * as fsHelpers from './file';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Cache {

  constructor() {
    const cache = new Storage();

    return {

      load() {
        const data = fsHelpers.readJSONSyncSafe(CACHE_PATH);
        cache.reset(data);
      },

      save() {
        const data = cache.toJSON();
        fsHelpers.writeJSONSyncSafe(CACHE_PATH, data);
      },

      set(key, value) {
        cache.set(key, value);
      },

      get(key, defaultValue) {
        return cache.get(key, defaultValue);
      },

    };
  }

}
