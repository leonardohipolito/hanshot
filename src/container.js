//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import _ from 'lodash';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Container {

  constructor() {
    const modules = {};

    return {

      register(nameOrMap, module) {
        if (_.isPlainObject(nameOrMap)) {
          _.extend(modules, nameOrMap);
        } else {
          modules[nameOrMap] = module;
        }
        return this;
      },

      get(nameOrNames) {
        if (_.isArray(nameOrNames)) {
          return nameOrNames.map(name => modules[name]);
        }
        return modules[nameOrNames];
      },

    };
  }

}
