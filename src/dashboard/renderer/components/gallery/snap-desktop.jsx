//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '~/dashboard/renderer/view-dispatch.js';
import { captureDesktop } from '~/actions';

import Button from '../common/button.jsx';
import ButtonGroup from '../common/button-group.jsx';
import { Dropdown, DropdownItem } from '../common/dropdown.jsx';

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
