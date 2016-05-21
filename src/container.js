//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function createContainer() {
  const providers = {};

  const TYPE_VALUE = 'value';
  const TYPE_FACTORY = 'factory';
  const TYPE_CLASS = 'class';

  function registerValue(name, value) {
    providers[name] = {
      type: TYPE_VALUE,
      value,
    };
  }

  function registerFactory(name, factory) {
    providers[name] = {
      type: TYPE_FACTORY,
      instance: null,
      instantiated: false,
      factory,
    };
  }

  function registerClass(name, constructor) {
    providers[name] = {
      type: TYPE_CLASS,
      instance: null,
      instantiated: false,
      constructor,
    };
  }

  function registerValues(map) {
    Object.keys(map).forEach(name => registerValue(name, map[name]));
  }

  function registerClasses(map) {
    Object.keys(map).forEach(name => registerClass(name, map[name]));
  }

  function registerFactories(map) {
    Object.keys(map).forEach(name => registerFactory(name, map[name]));
  }

  function get(name) {
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
  }

  function pick(names) {
    return names.map(name => this.get(name));
  }

  return {
    registerValue,
    registerFactory,
    registerClass,
    registerValues,
    registerFactories,
    registerClasses,
    get,
    pick,
  };
}
