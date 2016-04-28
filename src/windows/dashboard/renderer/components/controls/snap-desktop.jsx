'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var React = require('react');

var viewDispatch = require('../../view-dispatch');
var appActions = require('../../../../../app/actions');

var Button = require('../common/button.jsx');
var ButtonDropdown = require('../common/button-dropdown.jsx');
var DropdownItem = require('../common/dropdown-item.jsx');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

function SnapDesktop(props) {
  var displays = props.displays;

  if (displays.length < 2) {
    return (
      <Button
        onClick={function () {
          viewDispatch(appActions.captureDesktop());
        }}
      >
        Desktop
      </Button>
    );
  }

  return (
    <ButtonDropdown
      buttonTitle="Desktop"
      onButtonClick={function () {
        viewDispatch(appActions.captureDesktop());
      }}
    >
      {displays.map(function (display) {
        return (
          <DropdownItem
            key={display.id}
            onClick={function () {
              viewDispatch(appActions.captureDesktop(display.id));
            }}
          >
            {display.name}
          </DropdownItem>
        );
      })}
    </ButtonDropdown>
  );
}

SnapDesktop.propTypes = {
  displays: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

module.exports = SnapDesktop;
