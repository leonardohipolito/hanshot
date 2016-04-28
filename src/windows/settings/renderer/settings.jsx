var React = require('react');
var ReactDOM = require('react-dom');
var electron = require('electron');

var ImageFormat = require('./components/image-format.jsx');
var Behavior = require('./components/behavior.jsx');
var Save = require('./components/save.jsx');
var Upload = require('./components/upload.jsx');

var Settings = React.createClass({
  getInitialState: function () {
    return {
      settings: {},
      metadata: {}
    };
  },
  componentWillMount: function () {
    electron.ipcRenderer.on('settings-state-updated', this.onStateUpdated);
    electron.ipcRenderer.send('settings-ready');
  },
  componentWillUnmount: function () {
    electron.ipcRenderer.removeListener('settings-state-updated', this.onStateUpdated);
  },
  onStateUpdated: function (event, state) {
    this.setState(state);
  },
  render: function () {
    return (
      <div className="container-fluid">
        <form>
          <ImageFormat
            settings={this.state.settings}
            metadata={this.state.metadata}
          />
          <Behavior
            settings={this.state.settings}
          />
          <Save
            settings={this.state.settings}
          />
          <Upload
            settings={this.state.settings}
            metadata={this.state.metadata}
          />
        </form>
      </div>
    );
  }
});

ReactDOM.render(
  <Settings />,
  document.getElementById('settings')
);
