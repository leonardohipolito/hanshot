'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var React = electronRequire('react');

var viewDispatch = require('../../view-dispatch');
var appActions = require('../../../../../app/actions');

var Button = require('../common/button.jsx');
var ButtonDropdown = require('../common/button-dropdown.jsx');
var DropdownItem = require('../common/dropdown-item.jsx');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

function SnapSelection(props) {
  var displays = props.displays;

  if (displays.length < 2) {
    return (
      <Button
        onClick={function () {
          viewDispatch(appActions.captureSelection());
        }}
      >
        Selection
      </Button>
    );
  }

  return (
    <ButtonDropdown
      buttonTitle="Selection"
      onButtonClick={function () {
        viewDispatch(appActions.captureSelection());
      }}
    >
      {displays.map(function (display) {
        return (
          <DropdownItem
            key={display.id}
            onClick={function () {
              viewDispatch(appActions.captureSelection(display.id));
            }}
          >
            {display.name}
          </DropdownItem>
        );
      })}
    </ButtonDropdown>
  );
}

SnapSelection.propTypes = {
  displays: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

module.exports = SnapSelection;
