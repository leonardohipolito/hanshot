'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require('fs');
var path = require('path');

var electron = require('electron');
var _ = require('lodash');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

// TODO: most of implementation can be moved to one place along with Settings
//       create Storage base class
function Cache() {

  var cacheBasePath = electron.app.getPath('appData');
  this.cacheFilePath = path.join(cacheBasePath, 'hanshot', 'cache.json');

  console.log(this.cacheFilePath);

  this.cache = {};
  try {
    this.cache = require(this.cacheFilePath);
  } catch(err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      // It's fine if cache file does not exist, it will be created when any
      // action that uses cache happens
    } else {
      throw err;
    }
  }
}

Cache.prototype.get = function (key, defaultValue) {
  if (_.isUndefined(key)) {
    return this.cache;
  }
  return _.get(this.cache, key, defaultValue);
};

Cache.prototype.set = function (key, value) {
  this.cache[key] = value;
  return this.cache;
};

Cache.prototype.save = function () {
  var json = JSON.stringify(this.cache);
  // TODO: writing sync because cache is saved on app exit, seems like 
  // async operation might be cancelled on exit
  fs.writeFileSync(this.cacheFilePath, json);
  console.log('Cache saved');
};

module.exports = Cache;
