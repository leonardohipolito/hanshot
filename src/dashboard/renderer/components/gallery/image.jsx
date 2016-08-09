//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { openImageContextMenu } from '../../../../actions';

import './image.css';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Image(props) {
  const image = props.image;
  if (!image) {
    return (
      <center
        style={{
          margin: 'auto',
          color: '#ccc',
          fontSize: '20px',
        }}
      >
        No recent screenshots
      </center>
    );
  }

  return (
    <div className="image-container">
      <div className="image-title">
        {image.fileName}
      </div>
      <div className="image-content">
        <div
          className="image"
          onContextMenu={() => {
            viewDispatch(openImageContextMenu(image.filePath));
          }}
          style={{
            backgroundImage: `url(${image.dataURL})`,
            maxWidth: image.width,
            maxHeight: image.height,
          }}
        ></div>
      </div>
      <div className="image-info">
        <span>
          {image.width} x {image.height} pixels
        </span>
        {' '}
        <span>
          {image.fileSizeHuman}
        </span>
      </div>
    </div>
  );
}

Image.propTypes = {
  image: React.PropTypes.object,
};

Image.defaultProps = {
  image: null,
};
