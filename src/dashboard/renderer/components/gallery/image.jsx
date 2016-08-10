//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from 'app/dashboard/dispatch';
import { openImageContextMenu } from 'app/actions';

import { ColumnContainer } from '../common/grid.jsx';

import './image.css';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Image(props) {
  const image = props.image;
  if (!image) {
    return (
      <ColumnContainer className="image">
        <center className="missing">
          No recent screenshots
        </center>
      </ColumnContainer>
    );
  }

  return (
    <ColumnContainer className="image">
      <div className="title">
        {image.fileName}
      </div>
      <div className="wrapper">
        <div
          className="picture"
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
      <div className="info">
        <span>
          {image.width} x {image.height} pixels
        </span>
        {' '}
        <span>
          {image.fileSizeHuman}
        </span>
      </div>
    </ColumnContainer>
  );
}

Image.propTypes = {
  image: React.PropTypes.object,
};

Image.defaultProps = {
  image: null,
};
