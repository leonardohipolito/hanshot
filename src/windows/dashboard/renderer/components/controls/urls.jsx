var React = electronRequire('react');

var Dropdown = require('../common/dropdown.jsx');
var DropdownItem = require('../common/dropdown-item.jsx');

var actions = require('../../actions');

var Urls = React.createClass({
  render: function () {
    var image = this.props.image;

    if (!(image && image.publicUrls && image.publicUrls.length)) {
      return null;
    }

    return (
      <Dropdown
        title="Public URLs"
        right={true}
      >
        {image.publicUrls.map(function (url, index) {
          return (
            <DropdownItem
              key={index}
              onClick={function () {
                actions.copyText(url);
              }}
            >
              {url}
            </DropdownItem>
          );
        })}
      </Dropdown>
    );
  }
});

module.exports = Urls;
