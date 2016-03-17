var React = electronRequire('react');
var ReactDOM = electronRequire('react-dom');
var electron = electronRequire('electron');
var _ = electronRequire('lodash');

var Settings = React.createClass({
  getInitialState: function () {
    return {};
  },
  componentDidMount: function () {
    electron.ipcRenderer.on('settings-updated', function (event, settings) {
      this.setState(settings);
      console.log(settings);
    }.bind(this));
    electron.ipcRenderer.send('settings-requested');
  },
  componentWillUnmount: function () {
    electron.ipcRenderer.removeAllListeners('settings-updated');
  },
  toggle: function (setting) {

  },
  render: function () {
    return (
      <div className="container-fluid">
        <h2>Settings</h2>
        <h4>Dashboard</h4>
        <form>
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
        </form>
      </div>
    );
  }
});

ReactDOM.render(
  <Settings />,
  document.getElementById('settings')
);
