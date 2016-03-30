var React = electronRequire('react');
var ReactDOM = electronRequire('react-dom');
var electron = electronRequire('electron');

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
    electron.ipcRenderer.send('settings-state-requested');
  },
  componentWillUnmount: function () {
    electron.ipcRenderer.removeListener('settings-state-updated', this.onStateUpdated);
  },
  onStateUpdated: function (event, state) {
    this.setState(state);
  },
  toggle: function (setting, event) {
    this.setState({ [setting]: event.target.checked });
    electron.ipcRenderer.send('settings-changed', {
      key: setting,
      value: event.target.checked
    });
  },
  changeSaveDir: function () {
    electron.ipcRenderer.send('settings-dialog');
  },
  render: function () {
    return (
      <div className="container-fluid">
        <form>
          <div className="form-group">
            <div className="checkbox">
              <label>
                <input type="checkbox"
                  checked={this.state.close_before_capture}
                  onChange={this.toggle.bind(this, 'close_before_capture')}
                />
                Close before capture
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox"
                  checked={this.state.open_after_capture}
                  onChange={this.toggle.bind(this, 'open_after_capture')}
                />
                Open after capture
              </label>
            </div>
          </div>
          <SaveDirectory
            autoSave={this.state.settings.auto_save}
            saveDir={this.state.settings.save_dir}
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
