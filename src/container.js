//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Container {

  constructor() {
    const providers = {};

    const TYPE_VALUE = 'value';
    const TYPE_FACTORY = 'factory';
    const TYPE_CLASS = 'class';

    return {

      registerValue(name, value) {
        providers[name] = {
          type: TYPE_VALUE,
          value,
        };
      },

      registerFactory(name, factory) {
        providers[name] = {
          type: TYPE_FACTORY,
          instance: null,
          instantiated: false,
          factory,
        };
      },

      registerClass(name, constructor) {
        providers[name] = {
          type: TYPE_CLASS,
          instance: null,
          instantiated: false,
          constructor,
        };
      },

      registerValues(map) {
        Object.keys(map).forEach(name => this.registerValue(name, map[name]));
      },

      registerClasses(map) {
        Object.keys(map).forEach(name => this.registerClass(name, map[name]));
      },

      registerFactories(map) {
        Object.keys(map).forEach(name => this.registerFactory(name, map[name]));
      },

      get(name) {
        const provider = providers[name];
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
          provider.instance = provider.factory();
        } else if (provider.type === TYPE_CLASS) {
          provider.instance = new provider.constructor();
        }

        provider.instantiated = true;

        return provider.instance;
      },

      pick(names) {
        return names.map(name => this.get(name));
      },

    };
  }

}
