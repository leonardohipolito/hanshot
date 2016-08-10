//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';

import RendererIpc from '../../renderer-ipc.shim';
import { DASHBOARD_PAGE_GALLERY, DASHBOARD_PAGE_SETTINGS } from '../../constants';

import Gallery from './components/gallery/gallery.jsx';
import Settings from './components/settings/settings.jsx';
import { Router, Route } from './components/common/router.jsx';

import './dashboard.css';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

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

    return (
      <Router value={this.state.dashboard.activePage}>
        <Route value={DASHBOARD_PAGE_GALLERY}>
          <Gallery {...this.state} />
        </Route>
        <Route value={DASHBOARD_PAGE_SETTINGS}>
          <Settings {...this.state} />
        </Route>
      </Router>
    );
  }

}

ReactDOM.render(
  <Dashboard />,
  document.getElementById('dashboard')
);
