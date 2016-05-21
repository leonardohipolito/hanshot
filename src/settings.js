//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function createSettings(defaultSource, userSource) {
  let defaultStorage = {};
  let userStorage = {};

  function set(key, value) {
    userStorage[key] = value;
  }

  function get(key, defaultValue) {
    if (typeof userStorage[key] !== 'undefined') {
      return userStorage[key];
    }
    if (typeof defaultStorage[key] !== 'undefined') {
      return defaultStorage[key];
    }
    return defaultValue;
  }

  function load() {
    defaultStorage = defaultSource.read();
    if (userSource) {
      userStorage = userSource.read();
    }
  }

  function save() {
    userSource.write(userStorage);
  }

  function serialize() {
    return Object.assign({}, defaultStorage, userStorage);
  }

  return {
    set,
    get,
    load,
    save,
    serialize,
  };
}
