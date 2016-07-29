//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import { Card, CardHeader, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Alert(props) {
  const type = props.type || 'danger';

  return (
    <Card
      style={{
        marginBottom: '10px',
      }}
    >
      <CardHeader
        title={props.message}
      />
      <CardActions>
        {props.children}
      </CardActions>
    </Card>
  );
}
