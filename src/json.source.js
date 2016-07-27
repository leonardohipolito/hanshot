//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { readJSON, writeJSON } from './fs-extra';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class JSONSource {

  constructor(filePath) {
    this.filePath = filePath;
  }

  read() {
    return readJSON(this.filePath);
  }

  write(obj) {
    return writeJSON(this.filePath, obj);
  }

}
