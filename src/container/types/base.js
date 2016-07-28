//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Base {

  constructor(value) {
    this.value = value;
    this.promise = null;
  }

  dependencies() {
    // Extract dependency names from "inject" property attached to a values
    if (this.value.hasOwnProperty('inject')) {
      return this.value.inject;
    }
    return [];
  }

  // Convert plain value to a promise, if it's not already a promise
  promisify(value) {
    if (value instanceof Promise) {
      return value;
    }
    return Promise.resolve(value);
  }

  load(dependencies) {
    // Modules are instantiated once, for next load calls return already
    // instantiated value
    if (this.promise) {
      return this.promise;
    }

    this.promise = dependencies
      // Wait for all dependencies to load
      .then((values) => {
        // Instantiate a module using it's specific consturctor method, which
        // injects already resolved dependencies (as plain values)
        const value = this.resolve(this.value, values);
        const promise = this.promisify(value);
        return promise;
      });

    return this.promise;
  }

}
