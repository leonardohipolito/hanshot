'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var React = require('react');

var viewDispatch = require('../../view-dispatch');
import appActions from '../../../../../actions';

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
