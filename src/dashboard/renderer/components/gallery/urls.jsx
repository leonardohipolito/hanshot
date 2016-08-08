//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { copyText } from '../../../../actions';

import Dropdown from '../common/dropdown.jsx';
import DropdownItem from '../common/dropdown-item.jsx';

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
