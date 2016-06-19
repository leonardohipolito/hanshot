'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var React = require('react');

var viewDispatch = require('../../view-dispatch');
import appActions from '../../../../actions';

var Dropdown = require('../common/dropdown.jsx');
var DropdownItem = require('../common/dropdown-item.jsx');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

var Urls = React.createClass({
  render: function () {
    var image = this.props.image;

    if (!(image && image.publicUrls && image.publicUrls.length)) {
      return null;
    }

    return (
      <Dropdown
        title="Public URLs"
        alignMenuRight
      >
        {image.publicUrls.map(function (url, index) {
          return (
            <DropdownItem
              key={index}
              onClick={function () {
                viewDispatch(appActions.copyText(url));
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
