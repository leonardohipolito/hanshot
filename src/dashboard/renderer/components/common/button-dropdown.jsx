//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import IconMenu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
    <div>
      <RaisedButton
        style={{
          verticalAlign: 'top',
        }}
        onClick={props.onButtonClick}
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
    </div>
  );
}
