'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const electron = require('electron');

const ipcRenderer = electron.ipcRenderer;

const screens = require('../../shared/screens');


var SnapDesktopDefault = React.createClass({
  displayName: 'SnapDesktopDefault',
  handleClick: function () {
    ipcRenderer.send('snapshot-initiated', {
      type: 'desktop'
    });
  },
  render: function () {
    return (
      React.DOM.button({ onClick: this.handleClick }, 'Default desktop')
    );
  }
});

var SnapDesktopDisplays = React.createClass({
  displayName: 'SnapDesktopDisplays',
  handleChange: function (event) {
    var select = event.target;
    var displayId = Number(select.options[select.selectedIndex].value);

    ipcRenderer.send('snapshot-initiated', {
      type: 'desktop',
      displayId: displayId
    });
  },
  render: function () {

    var displays = [{ id: '', name: 'Pick display...' }];
    displays = displays.concat(screens.getNames());

    var options = displays.map(function (display) {
      return React.DOM.option(
        { value: display.id, key: display.id },
        display.name
      );
    });

    return (
      React.DOM.select({ onChange: this.handleChange }, options)
    );
  }
});

var SnapDesktop = React.createClass({
  displayName: 'SnapDesktop',
  render: function () {
    return (
      React.DOM.div(null,
        React.createElement(SnapDesktopDefault),
        React.createElement(SnapDesktopDisplays)
      )
    );
  }
});

var SnapPanel = React.createClass({
  displayName: 'SnapPanel',
  render: function () {
    return (
      React.createElement(SnapDesktop)
    );
  }
});

ReactDOM.render(
  React.createElement(SnapPanel, null),
  document.getElementById('app')
);
