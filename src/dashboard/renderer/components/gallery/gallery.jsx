//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import GalleryNavbar from './gallery-navbar.jsx';
import Image from './image.jsx';
import AlertArea from './alert-area.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Gallery(props) {
  return (
    <div className="dashboard-container">
      <GalleryNavbar
        metadata={props.metadata}
        image={props.image}
        displays={props.displays}
      />
      <div className="dashboard-content">
        <AlertArea
          alerts={props.alerts}
        />
        <Image
          image={props.image}
        />
      </div>
    </div>
  );
}
