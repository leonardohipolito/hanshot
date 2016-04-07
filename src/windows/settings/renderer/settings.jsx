var React = electronRequire('react');
var ReactDOM = electronRequire('react-dom');
var electron = electronRequire('electron');

var CloseBeforeCapture = require('./components/close-before-capture.jsx');
var OpenAfterCapture = require('./components/open-after-capture.jsx');
var TrayOnClose = require('./components/tray-on-close.jsx');
var SaveDirectory = require('./components/save-directory.jsx');
var DefaultUploader = require('./components/default-uploader.jsx');

var Settings = React.createClass({
  getInitialState: function () {
    return {
      settings: {}
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
          <CloseBeforeCapture
            closeBeforeCapture={this.state.settings['close-before-capture']}
          />
          <OpenAfterCapture
            openAfterCapture={this.state.settings['open-after-capture']}
          />
          <TrayOnClose
            trayOnClose={this.state.settings['tray-on-close']}
          />
          <SaveDirectory
            autoSave={this.state.settings['auto-save']}
            saveDir={this.state.settings['save-dir']}
          />
          <DefaultUploader
            uploaders={this.state.uploaders}
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
