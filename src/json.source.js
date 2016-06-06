//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as fs from 'fs';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class JSONSource {

  constructor(filePath) {
    this.filePath = filePath;
  }

  read() {
    const json = fs.readFileSync(this.filePath, 'utf8');
    const obj = JSON.parse(json);
    return obj;
  }

  write(obj) {
    const json = JSON.stringify(obj);
    fs.writeFileSync(this.filePath, json);
  }

}
