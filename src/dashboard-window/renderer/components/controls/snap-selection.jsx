//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { captureSelection } from '../../../../actions';

import Button from '../common/button.jsx';
import ButtonDropdown from '../common/button-dropdown.jsx';
import DropdownItem from '../common/dropdown-item.jsx';
import ToolbarWrap from '../common/toolbar-wrap.jsx';

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
            viewDispatch(captureSelection());
          }}
        >
          Selection
        </Button>
      </ToolbarWrap>
    );
  }

  return (
    <ToolbarWrap>
      <ButtonDropdown
        buttonTitle="Selection"
        onButtonClick={() => {
          viewDispatch(captureSelection());
        }}
      >
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
      </ButtonDropdown>
    </ToolbarWrap>
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
