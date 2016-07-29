//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import DashboardCss from './dashboard.css';
import RendererIpc from '../../renderer-ipc.shim';

import Navbar from './components/navbar.jsx';
import Image from './components/image.jsx';
import AlertArea from './components/alert-area.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const ipc = new RendererIpc('dashboard');

class Dashboard extends React.Component {

  constructor() {
    super();
    this.state = {};
    this.onStateUpdated = this.onStateUpdated.bind(this);
  }

  componentWillMount() {
    ipc.onMessage('state-updated', this.onStateUpdated);
    ipc.sendMessage('ready');
  }

  componentWillUnmount() {
    ipc.offMessage('state-updated', this.onStateUpdated);
  }

  onStateUpdated(state) {
    this.setState(state);
  }

  render() {
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

}

ReactDOM.render(
  <Dashboard />,
  document.getElementById('dashboard')
);
