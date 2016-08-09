//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import './button.css';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Button(props) {
  return (
    <button
      className="button"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  disabled: React.PropTypes.bool,
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
};
