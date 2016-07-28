//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import EventEmitter from 'events';

import log from '../log';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Cache {

  constructor(source) {
    this.storage = {};
    this.source = source;
    this.emitter = new EventEmitter();
  }

  set(key, value) {
    this.storage[key] = value;
  }

  get(key, defaultValue) {
    return typeof this.storage[key] !== 'undefined' ?
      this.storage[key] :
      defaultValue;
  }

  on(name, listener) {
    this.emitter.on(name, listener);
  }

  load() {
    return this.source
      .read()
      .then((data) => {
        this.storage = data;
        this.emitter.emit('load');
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
