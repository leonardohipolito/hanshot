var React = electronRequire('react');
var ReactDOM = electronRequire('react-dom');
var electron = electronRequire('electron');

var Navbar = require('./components/navbar.jsx');
var Image = require('./components/image.jsx');

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
          windows={this.state.windows}
          uploaders={this.state.uploaders}
          image={this.state.image}
        />
        <div className="container-fluid dashboard-content">
          <Image image={this.state.image} />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Dashboard />,
  document.getElementById('dashboard')
);
