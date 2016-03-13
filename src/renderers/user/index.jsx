var React = electronRequire('react');
var ReactDOM = electronRequire('react-dom');
var electron = electronRequire('electron');

var ipcRenderer = electron.ipcRenderer;

var SnapDesktop = require('./components/snap/desktop.jsx');
var SnapSelection = require('./components/snap/selection.jsx');
var SnapWindow = require('./components/snap/window.jsx');


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
      debugger;
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

ReactDOM.render(
  <ActionPanel />,
  document.getElementById('app')
);
