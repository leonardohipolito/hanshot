//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Dropdown(props) {

  var button = <RaisedButton>{' ' + props.title + ' '}</RaisedButton>;

  return (
    <IconMenu
      iconButtonElement={button}
    >
    </IconMenu>
  );
}
