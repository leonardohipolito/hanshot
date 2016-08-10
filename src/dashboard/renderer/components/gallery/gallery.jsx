//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import { ColumnContainer } from '../common/grid.jsx';

import GalleryNavbar from './gallery-navbar.jsx';
import Image from './image.jsx';
import AlertArea from './alert-area.jsx';

import './gallery.css';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Gallery(props) {
  return (
    <ColumnContainer className="gallery">
      <GalleryNavbar
        metadata={props.metadata}
        image={props.image}
        displays={props.displays}
      />
      <ColumnContainer className="content">
        <AlertArea
          alerts={props.alerts}
        />
        <Image
          image={props.image}
        />
      </ColumnContainer>
    </ColumnContainer>
  );
}

Gallery.propTypes = {
  image: React.PropTypes.object,
  metadata: React.PropTypes.object,
  displays: React.PropTypes.array,
  alerts: React.PropTypes.array,
};
