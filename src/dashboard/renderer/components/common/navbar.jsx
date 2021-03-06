//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import './navbar.css';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Navbar(props) {
  return (
    <div className="navbar">
      {props.children}
    </div>
  );
}

Navbar.propTypes = {
  children: React.PropTypes.node,
};
