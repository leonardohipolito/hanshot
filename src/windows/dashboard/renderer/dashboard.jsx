var React = electronRequire('react');
var ReactDOM = electronRequire('react-dom');
var electron = electronRequire('electron');

var Navbar = require('./components/navbar.jsx');
var Image = require('./components/image.jsx');
var AlertArea = require('./components/alert-area.jsx');

var Dashboard = React.createClass({
  getInitialState: function () {
    return {};
  },
  componentWillMount: function () {
    electron.ipcRenderer.on('dashboard-state-updated', this.onStateUpdated);
    electron.ipcRenderer.send('dashboard-ready');
  },
  componentWillUnmount: function () {
    electron.ipcRenderer.removeListener(
      'dashboard-state-updated', this.onStateUpdated
    );
  },
  onStateUpdated: function (event, state) {
    this.setState(state);
  },
  render: function () {
    return (
      <div className="dashboard-container">
        <Navbar
          displays={this.state.displays}
          metadata={this.state.metadata}
          image={this.state.image}
        />
        <div className="dashboard-content">
          <AlertArea
            alerts={this.state.alerts}
          />
          <Image
            image={this.state.image}
          />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Dashboard />,
  document.getElementById('dashboard')
);
