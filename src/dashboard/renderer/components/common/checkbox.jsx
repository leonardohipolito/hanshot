//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Checkbox(props) {
  return (
    <label>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(event) => {
          props.onChange(event, event.target.checked);
        }}
      />
      {props.text}
    </label>
  );
}

Checkbox.propTypes = {
  text: React.PropTypes.string,
  checked: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};
