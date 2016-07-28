//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Value from './types/value';
import Constructor from './types/constructor';
import Factory from './types/factory';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Container {

  constructor() {
    this.modules = {};
  }

  registerValue(name, value) {
    this.modules[name] = new Value(value);
  }

  registerConstructor(name, constructor) {
    this.modules[name] = new Constructor(constructor);
  }

  registerFactory(name, factory) {
    this.modules[name] = new Factory(factory);
  }

  registerValues(map) {
    Object.keys(map).forEach(name => this.registerValue(name, map[name]));
  }

  registerConstructors(map) {
    Object.keys(map).forEach(name => this.registerConstructor(name, map[name]));
  }

  registerFactories(map) {
    Object.keys(map).forEach(name => this.registerFactory(name, map[name]));
  }

  get(name) {
    const module = this.modules[name];
    if (!module) {
      return Promise.reject(`Container module not found: "${name}"`);
    }
    const dependencies = module.dependencies();
    dependencies.forEach((dependencyName) => {
      if (!this.modules[dependencyName]) {
        throw new Error(`Container dependency not registered: "${dependencyName}"`);
      }
    });
    return module.load(this.pick(dependencies));
  }

  pick(names) {
    return Promise.all(names.map(name => this.get(name)));
  }

  instantiate() {
    return this.pick(Object.keys(this.modules));
  }

}
