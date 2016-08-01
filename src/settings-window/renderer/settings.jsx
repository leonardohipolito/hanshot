//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import SettingsCss from './settings.css';
import RendererIpc from '../../renderer-ipc.shim';

import ImageFormat from './components/image-format.jsx';
import Behavior from './components/behavior.jsx';
import Save from './components/save.jsx';
import Upload from './components/upload.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const ipc = new RendererIpc('settings');

class Settings extends React.Component {

  constructor() {
    super();
    this.state = {
      settings: {},
      metadata: {},
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
      <MuiThemeProvider>
        <div className="container-fluid">
          <form>
            <ImageFormat
              settings={this.state.settings}
              metadata={this.state.metadata}
            />
            <Behavior
              settings={this.state.settings}
            />
            <Save
              settings={this.state.settings}
            />
            <Upload
              settings={this.state.settings}
              metadata={this.state.metadata}
            />
          </form>
        </div>
      </MuiThemeProvider>
    );
  }

}

ReactDOM.render(
  <Settings />,
  document.getElementById('settings')
);
