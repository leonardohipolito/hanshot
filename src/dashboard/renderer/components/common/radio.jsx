//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Radio(props) {
  return (
    <label>
      <input
        type="radio"
        value={props.value}
        name={props.name}
        checked={props.checked}
        onChange={(event) => {
          props.onChange(event, event.target.value);
        }}
      />
      {props.text}
    </label>
  );
}

Radio.propTypes = {
  text: React.PropTypes.string,
  value: React.PropTypes.string,
  name: React.PropTypes.string,
  checked: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};
