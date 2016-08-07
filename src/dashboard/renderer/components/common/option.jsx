//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Option(props) {
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
