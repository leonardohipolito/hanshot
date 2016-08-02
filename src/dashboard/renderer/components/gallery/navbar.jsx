//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import Toolbar from 'material-ui/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';

import SnapDesktop from './snap-desktop.jsx';
import SnapSelection from './snap-selection.jsx';
import Upload from './upload.jsx';
import Copy from './copy.jsx';
import Urls from './urls.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// TODO: do not use navbar in data flow, just as a component container
export default function Navbar(props) {
  // TODO: looks bad
  let imageControls;
  if (props.image) {
    imageControls = (
      <ToolbarGroup>
        <Urls image={props.image} />
        <Copy image={props.image} />
        <Upload
          metadata={props.metadata}
          image={props.image}
        />
      </ToolbarGroup>
    );
  }

  return (
    <Toolbar>
      <ToolbarGroup>
        <SnapDesktop displays={props.displays} />
        <SnapSelection displays={props.displays} />
      </ToolbarGroup>
      {imageControls}
    </Toolbar>
  );
}

Navbar.defaultProps = {
  displays: [],
  metadata: {},
};
