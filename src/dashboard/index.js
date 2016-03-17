'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function Dashboard(action) {
  this.window = new electron.BrowserWindow({
    show: action.capture === false
  });

  this.window.loadURL('file://' + __dirname + '/renderer/dashboard.html');
  this.window.webContents.openDevTools();
}

Dashboard.prototype.show = function () {
  this.window.show();
};

Dashboard.prototype.hide = function () {
  this.window.hide();
};

module.exports = Dashboard;
