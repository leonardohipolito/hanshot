//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Button from './button.jsx';
import Dropdown from './dropdown.jsx';
import ToolbarWrap from './toolbar-wrap.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function ButtonDropdown(props) {

  const icon = (
    <RaisedButton
      style={{
        minWidth: '30px',
        marginLeft: '-2px',
        boxShadow: 'rgba(0, 0, 0, 0.117647) 2px 1px 6px, rgba(0, 0, 0, 0.117647) 1px 1px 4px',
      }}
    >
      <MoreVertIcon
        style={{
          marginTop: '6px',
        }}
      />
    </RaisedButton>
  );

  return (
    <ToolbarWrap>
      <RaisedButton
        style={{
          verticalAlign: 'top'
        }}
      >
        {props.buttonTitle}
      </RaisedButton>
      <IconMenu
        iconButtonElement={icon}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {props.children}
      </IconMenu>
    </ToolbarWrap>
  );
}

ButtonDropdown.muiName = 'RaisedButton';
