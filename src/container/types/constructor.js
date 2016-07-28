//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Base from './base';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Constructor extends Base {

  resolve(constructor, dependencies) {
    return new constructor(...dependencies);
  }

}