'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as fs from 'fs';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export function readJSONSyncSafe(path) {

  var json = '';
  try {
    json = fs.readFileSync(path, 'utf8');
  } catch (err) {
    // Failed to read file, method should return empty object
    console.log(err.stack);
  }

  var obj = {};
  try {
    obj = JSON.parse(json);
  } catch (err) {
    // Bad file contents, method should return empty object
    console.log(err.stack);
  }

  return obj;
}

export function writeJSONSyncSafe(path, obj) {

  var json = '';
  try {
    json = JSON.stringify(obj);
  } catch (err) {
    // Failed to convert to JSON, should not continue
    console.log(err.stack);
    return false;
  }

  try {
    fs.writeFileSync(path, json);
  } catch (err) {
    // Failed to write file
    console.log(err.stack);
    return false;
  }

  return true;
};