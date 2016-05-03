//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import _ from 'lodash';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Cache {

  constructor() {
    let cache = {};

    return {

      reset(newCache) {
        if (_.isPlainObject(cache)) {
          cache = newCache;
        } else {
          cache = {};
        }
        return this;
      },

      get(key, defaultValue) {
        return _.get(cache, key, defaultValue);
      },

      set(key, value) {
        _.set(cache, key, value);
        return this;
      },

      remove(key) {
        // Returns true if key actually existed and it was succesfully removed
        return _.has(cache, key) && _.unset(cache, key);
      },

      toJSON() {
        return _.merge({}, cache);
      },

    };
  }

}
