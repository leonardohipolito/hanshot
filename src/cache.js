//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import log from './log';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Cache {

  constructor(source) {
    this.storage = {};
    this.source = source;
  }

  set(key, value) {
    this.storage[key] = value;
  }

  get(key, defaultValue) {
    return typeof this.storage[key] !== 'undefined' ?
      this.storage[key] :
      defaultValue;
  }

  load() {
    try {
      this.storage = this.source.read();
    } catch (err) {
      // Swallow all read errors and fallback to empty object
      log('Cache: read error');
      log(err);
    }
  }

  save() {
    try {
      this.source.write(this.storage);
    } catch (err) {
      // Swallow all write errors
      log('Cache: write error');
      log(err);
    }
  }

}
