//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

const TYPE_VALUE = 'value';
const TYPE_FACTORY = 'factory';
const TYPE_CLASS = 'class';

export default class Container {

  constructor() {
    this.providers = {};
  }

  registerValue(name, value) {
    this.providers[name] = {
      type: TYPE_VALUE,
      value,
    };
  }

  registerClass(name, constructor) {
    this.providers[name] = {
      type: TYPE_CLASS,
      instance: null,
      instantiated: false,
      constructor,
    };
  }

  registerFactory(name, factory) {
    this.providers[name] = {
      type: TYPE_FACTORY,
      instance: null,
      instantiated: false,
      factory,
    };
  }

  registerValues(map) {
    Object.keys(map).forEach(name => this.registerValue(name, map[name]));
  }

  registerClasses(map) {
    Object.keys(map).forEach(name => this.registerClass(name, map[name]));
  }

  registerFactories(map) {
    Object.keys(map).forEach(name => this.registerFactory(name, map[name]));
  }

  get(name) {
    const provider = this.providers[name];
    if (!provider) {
      return undefined;
    }

    if (provider.type === TYPE_VALUE) {
      return provider.value;
    }

    if (provider.instantiated) {
      return provider.instance;
    }

    if (provider.type === TYPE_FACTORY) {
      let depNames = [];
      if (provider.factory.hasOwnProperty('inject')) {
        depNames = provider.factory.inject;
      }
      depNames.forEach((depName) => {
        if (Object.keys(this.providers).indexOf(depName) === -1) {
          throw new Error(`Dependency not registered "${depName}"`);
        }
      });
      provider.instance = provider.factory(...this.pick(depNames));
    } else if (provider.type === TYPE_CLASS) {
      let depNames = [];
      if (provider.constructor.hasOwnProperty('inject')) {
        depNames = provider.constructor.inject;
      }
      depNames.forEach((depName) => {
        if (Object.keys(this.providers).indexOf(depName) === -1) {
          throw new Error(`Dependency not registered "${depName}"`);
        }
      });
      provider.instance = new provider.constructor(...this.pick(depNames));
    }

    provider.instantiated = true;

    return provider.instance;
  }

  pick(names) {
    return names.map(name => this.get(name));
  }

  instantiate() {
    this.pick(Object.keys(this.providers));
  }

}
