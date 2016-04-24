'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var React = electronRequire('react');

var viewDispatch = require('../../view-dispatch');
var appActions = require('../../../../../app/actions');

var Button = require('../common/button.jsx');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

function Copy(props) {
  return (
    <Button onClick={function () {
      viewDispatch(appActions.copyImage(props.image.filePath));
    }}>
      Copy
    </Button>
  );
}

Copy.propTypes = {
  image: React.PropTypes.shape({
    filePath: React.PropTypes.string.isRequired
  }).isRequired
};

module.exports = Copy;
