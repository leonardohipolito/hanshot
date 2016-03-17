'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path = require('path');

var electron = require('electron');
var _ = require('lodash');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

exports.init = function () {

  var defaultSettings = require('./default.json');

  var cacheBasePath = electron.app.getPath('appData');
  var userSettingsPath = path.join(cacheBasePath, 'hanshot', 'settings.json');

  var userSettings = {};
  try {
    userSettings = require(userSettingsPath);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      // It's fine if user settings file does not exist, it will be created
      // when user first saves his settings
    }
  }

  var resolvedSettings = _.merge({}, defaultSettings, userSettings);

  return {
    extend: function (extraSettings) {
      return _.merge(resolvedSettings, extraSettings);
    },
    get: function (settingPath) {
      return _.get(resolvedSettings, settingPath);
    },
    set: function (settingPath, value) {
      return _.set(resolvedSettings, settingPath, value);
    }
  };

};
