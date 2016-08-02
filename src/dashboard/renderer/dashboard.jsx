//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import RendererIpc from '../../renderer-ipc.shim';
import { DASHBOARD_PAGE_GALLERY, DASHBOARD_PAGE_SETTINGS } from '../../constants';

import DashboardCss from './dashboard.css';

import Gallery from './components/gallery/gallery.jsx';
import Settings from './components/settings/settings.jsx';

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
    this.state = {
      dashboard: {},
    };
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

    const activePage = this.state.dashboard.activePage;

    let page = null;
    if (activePage === DASHBOARD_PAGE_GALLERY) {
      page = <Gallery {...this.state} />;
    } else if (activePage === DASHBOARD_PAGE_SETTINGS) {
      page = <Settings {...this.state} />;
    }

    return (
      <MuiThemeProvider>
        {page}
      </MuiThemeProvider>
    );
  }

}

ReactDOM.render(
  <Dashboard />,
  document.getElementById('dashboard')
);
