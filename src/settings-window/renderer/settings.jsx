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

import { List, ListItem, MakeSelectable } from 'material-ui/List';
const SelectableList = MakeSelectable(List);

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const ipc = new RendererIpc('settings');

const SECTION_IMAGE_FORMAT = 'SECTION_IMAGE_FORMAT';
const SECTION_BEHAVIOR = 'SECTION_BEHAVIOR';
const SECTION_SAVE = 'SECTION_SAVE';
const SECTION_UPLOAD = 'SECTION_UPLOAD';


class Settings extends React.Component {

  constructor() {
    super();
    this.state = {
      activeSection: SECTION_IMAGE_FORMAT,
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

    let section = null;

    if (this.state.activeSection === SECTION_IMAGE_FORMAT) {
      section = (
        <ImageFormat
          settings={this.state.settings}
          metadata={this.state.metadata}
        />
      );
    } else if (this.state.activeSection === SECTION_BEHAVIOR) {
      section = (
        <Behavior
          settings={this.state.settings}
        />
      );
    } else if (this.state.activeSection === SECTION_SAVE) {
      section = (
        <Save
          settings={this.state.settings}
        />
      );
    } else if (this.state.activeSection === SECTION_UPLOAD) {
      section = (
        <Upload
          settings={this.state.settings}
          metadata={this.state.metadata}
        />
      );
    }

    return (
      <MuiThemeProvider>
        <div>
          <SelectableList
            value={this.state.activeSection}
            onChange={(event, value) => {
              this.setState({ activeSection: value });
            }}
            style={{
              width: 200,
              float: 'left',
              border: '1px solid #d9d9d9',
            }}
          >
            <ListItem
              value={SECTION_IMAGE_FORMAT}
              primaryText="Image Format"
            />
            <ListItem
              value={SECTION_BEHAVIOR}
              primaryText="Behavior"
            />
            <ListItem
              value={SECTION_SAVE}
              primaryText="Save"
            />
            <ListItem
              value={SECTION_UPLOAD}
              primaryText="Upload"
            />
          </SelectableList>
          <div
            style={{
              marginLeft: 230,
              paddingTop: 20,
            }}
          >
            {section}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

}

ReactDOM.render(
  <Settings />,
  document.getElementById('settings')
);
