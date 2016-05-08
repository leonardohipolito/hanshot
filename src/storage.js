//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import _ from 'lodash';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Storage {

  constructor() {
    let storage = {};

    return {

      reset(value) {
        if (_.isPlainObject(value)) {
          storage = value;
        } else {
          storage = {};
        }
        return this;
      },

      get(key, defaultValue) {
        // Default value is returned in case of "undefined"
        return _.get(storage, key, defaultValue);
      },

      set(key, value) {
        _.set(storage, key, value);
        return this;
      },

      has(key) {
        return _.has(storage, key);
      },

      remove(key) {
        // Returns true if key actually existed and it was succesfully removed
        return _.has(storage, key) && _.unset(storage, key);
      },

      toJSON() {
        return _.merge({}, storage);
      },

    };
  }

}
