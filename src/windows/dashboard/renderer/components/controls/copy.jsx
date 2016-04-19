var React = electronRequire('react');

var Button = require('../common/button.jsx');

var actions = require('../../actions');

var Copy = React.createClass({
  render: function () {

    var image = this.props.image;
    if (!image) {
      return null;
    }

    return (
      <Button
        onClick={function () {
          actions.copyImage(image.filePath);
        }}
      >
        Copy
      </Button>
    );
  }
});

module.exports = Copy;
