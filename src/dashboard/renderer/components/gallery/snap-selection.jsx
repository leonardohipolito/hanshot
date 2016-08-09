//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { captureSelection } from '../../../../actions';

import Button from '../common/button.jsx';
import ButtonGroup from '../common/button-group.jsx';
import { Dropdown, DropdownItem } from '../common/dropdown.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function SnapSelection(props) {
  const displays = props.displays;
  const button = (
    <Button
      onClick={() => {
        viewDispatch(captureSelection());
      }}
    >
      Selection
    </Button>
  );

  if (displays.length < 2) {
    return button;
  }

  return (
    <ButtonGroup>
      {button}
      <Dropdown>
        {displays.map((display) =>
          <DropdownItem
            key={display.id}
            onClick={() => {
              viewDispatch(captureSelection(display.id));
            }}
          >
            {display.name}
          </DropdownItem>
        )}
      </Dropdown>
    </ButtonGroup>
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
