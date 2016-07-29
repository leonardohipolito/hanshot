//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import * as appActions from '../../../../actions';

import Button from '../common/button.jsx';
import ToolbarWrap from '../common/toolbar-wrap.jsx';
var ButtonDropdown = require('../common/button-dropdown.jsx');
var DropdownItem = require('../common/dropdown-item.jsx');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function SnapSelection(props) {
  const displays = props.displays;

  if (displays.length < 2) {
    return (
      <ToolbarWrap>
        <Button
          {...props}
          onClick={() => {
            viewDispatch(appActions.captureSelection());
          }}
        >
          Selection
        </Button>
      </ToolbarWrap>
    );
  }

  return (
    <ButtonDropdown
      buttonTitle="Selection"
      onButtonClick={() => {
        viewDispatch(appActions.captureSelection());
      }}
    >
      {displays.map((display) =>
        <DropdownItem
          key={display.id}
          onClick={() => {
            viewDispatch(appActions.captureSelection(display.id));
          }}
        >
          {display.name}
        </DropdownItem>
      )}
    </ButtonDropdown>
  );
}

SnapSelection.propTypes = {
  displays: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
