//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import './disabled-area.css';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function DisabledArea(props) {
  const className = ['disabled-area'];
  if (props.active) {
    className.push('active');
  }
  return (
    <div className={className.join(' ')}>
      <div className="disabled-area-overlay"></div>
      {props.children}
    </div>
  );
}

DisabledArea.propTypes = {
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
};
