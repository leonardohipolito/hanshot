//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import './button-group.css';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function ButtonGroup(props) {
  return (
    <div className="button-group">
      {props.children}
    </div>
  );
}

ButtonGroup.propTypes = {
  children: React.PropTypes.node,
};
