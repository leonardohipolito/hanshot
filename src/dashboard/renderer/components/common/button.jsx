//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Button(props) {
  return (
    <RaisedButton {...props}>
      {props.children}
    </RaisedButton>
  );
}
