//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { uploadImage } from '../../../../actions';

import ButtonDropdown from '../common/button-dropdown.jsx';
var DropdownItem = require('../common/dropdown-item.jsx');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Upload(props) {
  const image = props.image;
  if (!image) {
    return null;
  }

  const hosts = props.metadata.uploadHosts;
  if (!(hosts && hosts.length)) {
    return null;
  }

  return (
    <ButtonDropdown
      buttonTitle="Upload"
      alignMenuRight
      onButtonClick={() => {
        viewDispatch(uploadImage(image.filePath));
      }}
    >
      {hosts.map((host) =>
        <DropdownItem
          key={host.id}
          onClick={() => {
            viewDispatch(uploadImage(image.filePath, host.id));
          }}
        >
          {host.name}
        </DropdownItem>
      )}
    </ButtonDropdown>
  );
}

Upload.defaultProps = {
  image: null,
  metadata: {
    uploadHosts: [],
  },
};
