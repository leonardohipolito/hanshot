//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '~/dashboard/renderer/view-dispatch.js';
import { copyText } from '~/actions';

import { Dropdown, DropdownItem } from '../common/dropdown.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Urls(props) {
  const image = props.image;

  if (!(image && image.publicUrls && image.publicUrls.length)) {
    return null;
  }

  return (
    <Dropdown
      menuLeft
      title="URLs"
    >
      {image.publicUrls.map((url, index) =>
        <DropdownItem
          key={index}
          onClick={() => {
            viewDispatch(copyText(url));
          }}
        >
          {url}
        </DropdownItem>
      )}
    </Dropdown>
  );
}

Urls.propTypes = {
  image: React.PropTypes.object,
};
