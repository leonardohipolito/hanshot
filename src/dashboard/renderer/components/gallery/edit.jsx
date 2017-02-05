//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '~/dashboard/renderer/view-dispatch.js';
import { openEditor } from '~/actions';

import Button from '../common/button.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Edit(props) {
  return (
    <Button
      onClick={() => {
        viewDispatch(openEditor(props.image.filePath));
      }}
    >
      Edit
    </Button>
  );
}

Edit.propTypes = {
  image: React.PropTypes.shape({
    filePath: React.PropTypes.string.isRequired,
  }).isRequired,
};
