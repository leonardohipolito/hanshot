//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import './alert.css';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Alert(props) {
  return (
    <div className="alert">
      <p>
        {props.message}
      </p>
      <p>
        {props.children}
      </p>
    </div>
  );
}

Alert.propTypes = {
  message: React.PropTypes.string,
  children: React.PropTypes.node,
};
