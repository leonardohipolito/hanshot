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

// TODO: most of implementation can be moved to one place along with Cache
//       create Storage base class
function Settings() {

  this.window = null;

  this.defaultSettings = require('./default.json');

  var cacheBasePath = electron.app.getPath('appData');
  this.userSettingsPath = path.join(cacheBasePath, 'hanshot', 'settings.json');

  this.userSettings = {};
  try {
    this.userSettings = require(this.userSettingsPath);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      // It's fine if user settings file does not exist, it will be created
      // when user first saves his settings
    } else {
      throw err;
    }
  }

  this.settings = _.merge({}, this.defaultSettings, this.userSettings);

  // TODO: check if directory does not exist, think of default strategy
  if (this.settings['save_dir'] === null) {
    this.settings['save_dir'] = electron.app.getPath('pictures');
  }

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
  this.window.webContents.openDevTools();

  this.window.on('closed', function () {
    this.save();
  }.bind(this));
};

Settings.prototype.get = function (key) {
  if (_.isUndefined(key)) {
    return this.settings;
  }
  return this.settings[key];
};

Settings.prototype.set = function (key, value) {
  this.userSettings[key] = value;
  this.settings[key] = value;
  return this.settings;
};

Settings.prototype.save = function () {
  var json = JSON.stringify(this.userSettings);
  fs.writeFile(this.userSettingsPath, json, function (err) {
    if (err) throw err;
    console.log('Settings saved');
  });
};

module.exports = Settings;
