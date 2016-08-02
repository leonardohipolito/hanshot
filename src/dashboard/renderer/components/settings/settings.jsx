//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import { openDashboard } from '../../../../actions';
import viewDispatch from '../../view-dispatch';

import Toolbar from 'material-ui/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import FlatButton from 'material-ui/FlatButton';
import NavigateBeforeIcon from 'material-ui/svg-icons/image/navigate-before';

import ImageFormat from './image-format.jsx';
import Behavior from './behavior.jsx';
import Save from './save.jsx';
import Upload from './upload.jsx';

import { List, ListItem, MakeSelectable } from 'material-ui/List';
const SelectableList = MakeSelectable(List);

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
    let section = null;
    if (this.state.activeSection === SECTION_IMAGE_FORMAT) {
      section = (
        <ImageFormat
          settings={this.props.settings}
          metadata={this.props.metadata}
        />
      );
    } else if (this.state.activeSection === SECTION_BEHAVIOR) {
      section = (
        <Behavior
          settings={this.props.settings}
        />
      );
    } else if (this.state.activeSection === SECTION_SAVE) {
      section = (
        <Save
          settings={this.props.settings}
        />
      );
    } else if (this.state.activeSection === SECTION_UPLOAD) {
      section = (
        <Upload
          settings={this.props.settings}
          metadata={this.props.metadata}
        />
      );
    }


    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild>
            <FlatButton
              label="Back to Dashboard"
              icon={<NavigateBeforeIcon />}
              onClick={() => {
                viewDispatch(openDashboard());
              }}
            />
          </ToolbarGroup>
        </Toolbar>
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
      </div>
    );
  }

}
