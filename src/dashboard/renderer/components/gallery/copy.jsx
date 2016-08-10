//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from 'app/dashboard/dispatch';
import { copyImage } from 'app/actions';

import Button from '../common/button.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Copy(props) {
  return (
    <Button
      onClick={() => {
        viewDispatch(copyImage(props.image.filePath));
      }}
    >
      Copy
    </Button>
  );
}

Copy.propTypes = {
  image: React.PropTypes.shape({
    filePath: React.PropTypes.string.isRequired,
  }).isRequired,
};
