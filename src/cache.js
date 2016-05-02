'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import _ from 'lodash';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Cache {

  constructor() {
    this._cache = {};
  }

  reset(cache) {
    if (_.isPlainObject(cache)) {
      this._cache = cache;
    } else {
      this._cache = {};
    }
    return this;
  }

  get(key, defaultValue) {
    return _.get(this._cache, key, defaultValue);
  }

  set(key, value) {
    _.set(this._cache, key, value);
    return this;
  }

  remove(key) {
    // Returns true if key actually existed and it was succesfully removed
    return _.has(this._cache, key) && _.unset(this._cache, key);
  }

  toJSON() {
    return _.merge({}, this._cache);
  }

}
