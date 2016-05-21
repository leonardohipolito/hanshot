//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as fs from 'fs';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function createJSON(filePath) {
  function read() {
    let obj = {};
    try {
      // eslint-disable-next-line global-require
      obj = require(filePath);
    } catch (err) {
      // Failed to read file or not JSON content
    }
    return obj;
  }

  function write(obj) {
    const json = JSON.stringify(obj);
    fs.writeFileSync(filePath, json);
  }

  return {
    read,
    write,
  };
}
