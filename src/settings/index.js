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

function Settings() {

  this.window = null;

  this.defaultSettings = require('./default.json');

  var cacheBasePath = electron.app.getPath('appData');
  var userSettingsPath = path.join(cacheBasePath, 'hanshot', 'settings.json');

  this.userSettings = {};
  try {
    this.userSettings = require(userSettingsPath);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      // It's fine if user settings file does not exist, it will be created
      // when user first saves his settings
    }
  }

  this.resolvedSettings = _.merge({}, this.defaultSettings, this.userSettings);
};

Settings.prototype.open = function () {
  if (this.window) {
    return;
  }
  this.window = new electron.BrowserWindow();
  this.window.loadURL('file://' + __dirname + '/renderer/settings.html');
  this.window.on('closed', function () {
    this.window = null;
  }.bind(this));
};

Settings.prototype.extend = function (extraSettings) {
  return _.merge(this.resolvedSettings, extraSettings);
};

Settings.prototype.get = function (settingPath) {
  return _.get(this.resolvedSettings, settingPath);
};

Settings.prototype.set = function (settingPath, value) {
  return _.set(this.resolvedSettings, settingPath, value);
};

module.exports = Settings;
