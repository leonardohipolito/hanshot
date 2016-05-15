//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var React = require('react');
var ReactDOM = require('react-dom');

import * as renderer from '../../../renderer.shim';

var Navbar = require('./components/navbar.jsx');
var Image = require('./components/image.jsx');
var AlertArea = require('./components/alert-area.jsx');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

const ipc = renderer.createIpc('dashboard');

var Dashboard = React.createClass({
  getInitialState: function () {
    return {};
  },
  componentWillMount: function () {
    ipc.onMessage('state-updated', this.onStateUpdated);
    ipc.sendMessage('ready');
  },
  componentWillUnmount: function () {
    ipc.offMessage('state-updated', this.onStateUpdated);
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
