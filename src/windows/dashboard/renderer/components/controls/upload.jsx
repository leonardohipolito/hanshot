'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var React = require('react');

var viewDispatch = require('../../view-dispatch');
var appActions = require('../../../../../app/actions');

var ButtonDropdown = require('../common/button-dropdown.jsx');
var DropdownItem = require('../common/dropdown-item.jsx');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

var Upload = React.createClass({
  getDefaultProps: function () {
    return {
      image: null,
      metadata: {
        uploadHosts: []
      }
    };
  },
  render: function () {

    var image = this.props.image;
    if (!image) {
      return null;
    }

    var hosts = this.props.metadata.uploadHosts;
    if (!(hosts && hosts.length)) {
      return null;
    }

    return (
      <ButtonDropdown
        buttonTitle="Upload"
        alignMenuRight
        onButtonClick={function () {
          viewDispatch(appActions.uploadImage(image.filePath));
        }}
      >
        {hosts.map(function (host) {
            return (
              <DropdownItem
                key={host.id}
                onClick={function () {
                  viewDispatch(appActions.uploadImage(image.filePath, host.id));
                }}
              >
                {host.name}
              </DropdownItem>
            );
          }, this)}
      </ButtonDropdown>
    );

  }
});

module.exports = Upload;
