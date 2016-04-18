'use strict';

var electron = require('electron');

var container = document.querySelector('#container');

electron.ipcRenderer.on('notification-text-updated', function (event, text) {
  container.innerHTML = text;
});

document.addEventListener('mouseover', function () {
  electron.ipcRenderer.send('notification-hover');
}, true);
