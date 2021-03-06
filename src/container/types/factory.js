//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Base from './base';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Factory extends Base {

  resolve(factory, dependencies) {
    return factory(...dependencies);
  }

}
