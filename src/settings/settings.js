//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import log from '../log';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Settings {

  constructor(defaultSource, userSource) {
    this.defaultStorage = {};
    this.userStorage = {};
    this.defaultSource = defaultSource;
    this.userSource = userSource;
  }

  set(key, value) {
    this.userStorage[key] = value;
  }

  get(key, defaultValue) {
    if (typeof this.userStorage[key] !== 'undefined') {
      return this.userStorage[key];
    }
    if (typeof this.defaultStorage[key] !== 'undefined') {
      return this.defaultStorage[key];
    }
    return defaultValue;
  }

  load() {
    return Promise
      .all([
        this.loadDefaultSource(),
        this.loadUserSource(),
      ])
      .then(() => {
        return this;
      });
  }

  loadDefaultSource() {
    return this.defaultSource
      .read()
      .then((data) => {
        this.defaultStorage = data;
      })
      .catch((err) => {
        // Do not rethrow read error, because app can still work
        log('Settings: default read error');
        log(err);
      });
  }

  loadUserSource() {
    return this.userSource
      .read()
      .then((data) => {
        this.userStorage = data;
      })
      .catch((err) => {
        // Do not rethrow read error, because app can still work
        log('Settings: user read error');
        log(err);
      });
  }

  save() {
    return this.userSource
      .write(this.userStorage)
      .catch((err) => {
        // Do not rethrow write error, because app can still work
        log('Settings: user write error');
        log(err);
      });
  }

  serialize() {
    return Object.assign({}, this.defaultStorage, this.userStorage);
  }

}
