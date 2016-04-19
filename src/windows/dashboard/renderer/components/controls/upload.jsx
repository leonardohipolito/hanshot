var React = electronRequire('react');

var ButtonDropdown = require('../common/button-dropdown.jsx');
var DropdownItem = require('../common/dropdown-item.jsx');

var actions = require('../../actions');

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
        title="Upload"
        right={true}
        onButtonClick={function () {
          actions.upload(image.filePath);
        }}
      >
        {hosts.map(function (host) {
            return (
              <DropdownItem
                key={host.id}
                onClick={function () {
                  actions.upload(image.filePath, host.id);
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
