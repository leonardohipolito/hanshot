//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function ButtonDropdown(props) {
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-default"
        onButtonClick={props.onButtonClick}
      >
        {' ' + props.buttonTitle + ' '}
      </button>
      <button
        type="button"
        className="btn btn-default dropdown-toggle"
        data-toggle="dropdown"
      >
        <span className="caret"></span>
      </button>
      <ul
        className={[
          'dropdown-menu',
          (props.alignMenuRight ? 'dropdown-menu-right' : '')
        ].join(' ')}
      >
        {props.children}
      </ul>
    </div>
  );
}
