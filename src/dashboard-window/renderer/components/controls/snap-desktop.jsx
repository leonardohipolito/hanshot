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

export default function SnapDesktop(props) {
  const displays = props.displays;

  if (displays.length < 2) {
    return (
      <ToolbarWrap>
        <Button
          {...props}
          onClick={() => {
            viewDispatch(appActions.captureDesktop());
          }}
        >
          Desktop
        </Button>
      </ToolbarWrap>
    );
  }

  return (
    <ButtonDropdown
      buttonTitle="Desktop"
      onButtonClick={() => {
        viewDispatch(appActions.captureDesktop());
      }}
    >
      {displays.map((display) =>
        <DropdownItem
          key={display.id}
          onClick={() => {
            viewDispatch(appActions.captureDesktop(display.id));
          }}
        >
          {display.name}
        </DropdownItem>
      )}
    </ButtonDropdown>
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
