'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path = require('path');

var electron = require('electron');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

var dataPath = electron.app.getPath('appData');

var config = {

  CACHE_PATH: path.join(dataPath, 'hanshot', 'cache.json')

};

module.exports = config;
