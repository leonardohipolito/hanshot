var React = electronRequire('react');
var electron = electronRequire('electron');

var ipcRenderer = electron.ipcRenderer;

var SnapDesktop = require('./snap/desktop.jsx');
var SnapSelection = require('./snap/selection.jsx');
var SnapWindow = require('./snap/window.jsx');

var ActionPanel = React.createClass({
  getInitialState: function () {
    return {
      displays: [],
      windows: []
    };
  },
  componentDidMount: function () {
    var self = this;
    ipcRenderer.on('displays-updated', function (event, displays) {
      self.setState({ displays: displays });
    });
    ipcRenderer.send('displays-requested');

    ipcRenderer.on('windows-updated', function (event, windows) {
      self.setState({ windows: windows });
    });
    ipcRenderer.send('windows-requested');
  },
  componentWillUnmount: function () {
    ipcRenderer.removeAllListeners('displays-updated');
    ipcRenderer.removeAllListeners('windows-updated');
  },
  render: function () {
    return (
      <div>
        <SnapDesktop displays={this.state.displays} />
        <SnapSelection displays={this.state.displays} />
        <SnapWindow windows={this.state.windows} />
      </div>
    );
  }
});

module.exports = ActionPanel;
