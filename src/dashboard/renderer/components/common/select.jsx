//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export function Option(props) {
  return (
    <option
      value={props.value}
    >
      {props.text}
    </option>
  );
}

Option.propTypes = {
  value: React.PropTypes.string,
  text: React.PropTypes.string,
};

//------------------------------------------------------------------------------

export function Select(props) {
  return (
    <select
      value={props.value}
      onChange={(event) => {
        const target = event.target;
        const value = target.options[target.selectedIndex].value;
        props.onChange(event, value);
      }}
    >
      {props.children}
    </select>
  );
}

Select.propTypes = {
  children: React.PropTypes.node,
  onChange: React.PropTypes.func,
};
