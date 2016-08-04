//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { copyImage } from '../../../../actions';

import Button from '../common/button.jsx';
import ToolbarWrap from '../common/toolbar-wrap.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Copy(props) {
  return (
    <ToolbarWrap>
      <Button
        onClick={() => {
          viewDispatch(copyImage(props.image.filePath));
        }}
      >
        Copy
      </Button>
    </ToolbarWrap>
  );
}

Copy.propTypes = {
  image: React.PropTypes.shape({
    filePath: React.PropTypes.string.isRequired,
  }).isRequired,
};
