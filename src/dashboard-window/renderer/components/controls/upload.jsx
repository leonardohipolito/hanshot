//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { uploadImage } from '../../../../actions';

import ButtonDropdown from '../common/button-dropdown.jsx';
import DropdownItem from '../common/dropdown-item.jsx';
import ToolbarWrap from '../common/toolbar-wrap.jsx';

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
    <ToolbarWrap>
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
    </ToolbarWrap>
  );
}

Upload.muiName = 'RaisedButton';

Upload.defaultProps = {
  image: null,
  metadata: {
    uploadHosts: [],
  },
};
