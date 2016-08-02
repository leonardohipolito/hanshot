//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { captureDesktop } from '../../../../actions';

import Button from '../common/button.jsx';
import ButtonDropdown from '../common/button-dropdown.jsx';
import DropdownItem from '../common/dropdown-item.jsx';
import ToolbarWrap from '../common/toolbar-wrap.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function SnapDesktop(props) {
  const displays = props.displays;

  if (displays.length < 2) {
    return (
      <ToolbarWrap>
        <Button
          {...props}
          onClick={() => {
            viewDispatch(captureDesktop());
          }}
        >
          Desktop
        </Button>
      </ToolbarWrap>
    );
  }

  return (
    <ToolbarWrap>
      <ButtonDropdown
        buttonTitle="Desktop"
        onButtonClick={() => {
          viewDispatch(captureDesktop());
        }}
      >
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
      </ButtonDropdown>
    </ToolbarWrap>
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
