//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import IconMenu from 'material-ui/IconMenu';
import ToolbarWrap from './toolbar-wrap.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Dropdown(props) {

  const button = (
    <RaisedButton
      icon={<NavigationExpandMoreIcon />}
    >
      URLs
    </RaisedButton>
  );

  return (
    <ToolbarWrap>
      <IconMenu
        iconButtonElement={button}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {props.children}
      </IconMenu>
    </ToolbarWrap>
  );
}
