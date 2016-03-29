'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');
var _ = require('lodash');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function Dashboard(action) {

  this.state = {};

  this.window = new electron.BrowserWindow({
    show: action.capture === false
  });

  this.window.loadURL('file://' + __dirname + '/renderer/dashboard.html');
  // this.window.webContents.openDevTools();
}

Dashboard.prototype.show = function () {
  this.window.show();
};

Dashboard.prototype.hide = function () {
  this.window.hide();
};

Dashboard.prototype.updateState = function (newState) {
  if (!_.isUndefined(newState)) {
    _.merge(this.state, newState);
  }
  this.window.webContents.send('dashboard-state-updated', this.state);
};

module.exports = Dashboard;
