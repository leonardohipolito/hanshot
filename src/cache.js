'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require('fs');

var _ = require('lodash');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

function Cache(cacheFilePath) {

  // TODO: supress logs in tests (add logger?)
  console.log('Cache path', cacheFilePath);

  var cache = {};

  var fileContents = '';
  try {
    fileContents = fs.readFileSync(cacheFilePath, 'utf8');
  } catch (err) {
    // It's fine if cache file does not exist, it will be created on save
    if (err.code !== 'ENOENT') {
      throw new Error(err);
    }
  }

  try {
    cache = JSON.parse(fileContents);
  } catch (err) {
    // Bad content of cache file, it will be overriden on save then
  }

  return {

    get: function (key, defaultValue) {
      return _.get(cache, key, defaultValue);
    },

    set: function (key, value) {
      _.set(cache, key, value);
      return this;
    },

    save: function () {
      var json = JSON.stringify(cache);
      // TODO: writing sync because cache is saved on app exit, seems like
      // async operation might be cancelled on exit
      fs.writeFileSync(cacheFilePath, json);
      console.log('Cache saved');
    }

  };

}

module.exports = Cache;
