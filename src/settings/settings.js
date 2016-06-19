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
    try {
      this.defaultStorage = this.defaultSource.read();
    } catch (err) {
      // Swallow all read errors and fallback to empty object
      log('Settings: default read error');
      log(err);
    }
    if (this.userSource) {
      try {
        this.userStorage = this.userSource.read();
      } catch (err) {
        // Swallow all read errors and fallback to empty object
        log('Settings: user read error');
        log(err);
      }
    }
  }

  save() {
    try {
      this.userSource.write(this.userStorage);
    } catch (err) {
      // Swallow all write errors
      log('Settings: user write error');
      log(err);
    }
  }

  serialize() {
    return Object.assign({}, this.defaultStorage, this.userStorage);
  }

}
