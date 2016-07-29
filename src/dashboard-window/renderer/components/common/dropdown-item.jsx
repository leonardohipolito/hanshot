//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import MenuItem from 'material-ui/MenuItem';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

function DropdownItem(props) {
  return (
    <MenuItem
      {...props}
    >
      {props.children}
    </MenuItem>
  );
}

module.exports = DropdownItem;
