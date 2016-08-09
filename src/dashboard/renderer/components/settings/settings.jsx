//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import { Menu, MenuItem } from '../common/menu.jsx';
import { Router, Route } from '../common/router.jsx';

import SettingsNavbar from './settings-navbar.jsx';
import ImageFormat from './image-format.jsx';
import Behavior from './behavior.jsx';
import Save from './save.jsx';
import Upload from './upload.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

const SECTION_IMAGE_FORMAT = 'SECTION_IMAGE_FORMAT';
const SECTION_BEHAVIOR = 'SECTION_BEHAVIOR';
const SECTION_SAVE = 'SECTION_SAVE';
const SECTION_UPLOAD = 'SECTION_UPLOAD';

export default class Settings extends React.Component {

  constructor() {
    super();
    this.state = {
      activeSection: SECTION_IMAGE_FORMAT,
    };
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <SettingsNavbar />
        <div
          style={{
            display: 'flex',
            flex: '1',
          }}
        >
          <div className="sidebar">
            <Menu
              value={this.state.activeSection}
              onSelect={(value) => {
                this.setState({ activeSection: value });
              }}
            >
              <MenuItem value={SECTION_IMAGE_FORMAT}>
                Image Format
              </MenuItem>
              <MenuItem value={SECTION_BEHAVIOR}>
                Behavior
              </MenuItem>
              <MenuItem value={SECTION_SAVE}>
                Save
              </MenuItem>
              <MenuItem value={SECTION_UPLOAD}>
                Upload
              </MenuItem>
            </Menu>
          </div>
          <div
            style={{
              paddingLeft: 20,
              flex: 1,
            }}
          >
            <Router value={this.state.activeSection}>
              <Route value={SECTION_IMAGE_FORMAT}>
                <ImageFormat
                  settings={this.props.settings}
                  metadata={this.props.metadata}
                />
              </Route>
              <Route value={SECTION_BEHAVIOR}>
                <Behavior
                  settings={this.props.settings}
                />
              </Route>
              <Route value={SECTION_SAVE}>
                <Save
                  settings={this.props.settings}
                />
              </Route>
              <Route value={SECTION_UPLOAD}>
                <Upload
                  settings={this.props.settings}
                  metadata={this.props.metadata}
                />
              </Route>
            </Router>
          </div>
        </div>
      </div>
    );
  }

}

Settings.propTypes = {
  settings: React.PropTypes.object,
  metadata: React.PropTypes.object,
};
