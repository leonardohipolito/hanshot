//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { captureDesktop } from '../../../../actions';

import Button from '../common/button.jsx';
import ButtonGroup from '../common/button-group.jsx';
import Dropdown from '../common/dropdown.jsx';
import DropdownItem from '../common/dropdown-item.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function SnapDesktop(props) {
  const displays = props.displays;

  const button = (
    <Button
      onClick={() => {
        viewDispatch(captureDesktop());
      }}
    >
      Desktop
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
              viewDispatch(captureDesktop(display.id));
            }}
          >
            {display.name}
          </DropdownItem>
        )}
      </Dropdown>
    </ButtonGroup>
  );
}

SnapDesktop.propTypes = {
  displays: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
