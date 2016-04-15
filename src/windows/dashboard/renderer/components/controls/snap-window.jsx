var React = electronRequire('react');

var Dropdown = require('../common/dropdown.jsx');
var DropdownItem = require('../common/dropdown-item.jsx');

var actions = require('../../actions');

var SnapWindow = React.createClass({
  render: function () {
    var windows = this.props.windows;
    if (!(windows && windows.length)) {
      return null;
    }
    return (
      <Dropdown
        title="Window"
      >
        {windows.map(function (win) {
          return (
            <DropdownItem
              key={win.id}
              onClick={function () {
                actions.snapWindow(win.id);
              }}
            >
              {win.name}
            </DropdownItem>
          );
        }, this)}
      </Dropdown>
    );
  }
});

module.exports = SnapWindow;
