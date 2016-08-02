//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import log from '../log';

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
    return this.source
      .read()
      .then((data) => {
        this.storage = data;
        return this;
      })
      .catch((err) => {
        // Do not rethrow cache read error, because app can still work
        log('Cache: read error');
        log(err);
      });
  }

  save() {
    return this.source
      .write(this.storage)
      .catch((err) => {
        // Do not rethrow cache write error, because app can still work
        log('Cache: write error');
        log(err);
      });
  }

}
