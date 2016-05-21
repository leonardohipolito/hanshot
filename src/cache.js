//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function createCache(source) {
  let storage = {};

  function set(key, value) {
    storage[key] = value;
  }

  function get(key, defaultValue) {
    return typeof storage[key] !== 'undefined' ? storage[key] : defaultValue;
  }

  function load() {
    storage = source.read();
  }

  function save() {
    source.write(storage);
  }

  return {
    set,
    get,
    load,
    save,
  };
}
