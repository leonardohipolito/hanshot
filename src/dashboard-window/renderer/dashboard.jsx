//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var React = require('react');
var ReactDOM = require('react-dom');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';



import DashboardCss from './dashboard.css';
import RendererIpc from '../../renderer-ipc.shim';

import Navbar from './components/navbar.jsx';
var Image = require('./components/image.jsx');
var AlertArea = require('./components/alert-area.jsx');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const ipc = new RendererIpc('dashboard');

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
  onStateUpdated: function (state) {
    this.setState(state);
  },
  render: function () {
    console.log(this.state);
    return (
      <MuiThemeProvider>
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
      </MuiThemeProvider>
    );
  }
});

ReactDOM.render(
  <Dashboard />,
  document.getElementById('dashboard')
);
