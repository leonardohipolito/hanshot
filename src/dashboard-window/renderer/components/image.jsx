//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../view-dispatch';
import { openImageContextMenu } from '../../../actions';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import BrokenImageIcon from 'material-ui/svg-icons/image/broken-image';

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
        <BrokenImageIcon
          style={{
            width: '40px',
            height: '40px',
            verticalAlign: 'middle',
            color: '#ccc',
            marginTop: '-5px',
          }}
        />
        No recent screenshots
      </center>
    );
  }

  return (
    <Card
      className="image-container"
    >
      <CardHeader
        title={image.fileName}
        className="image-title"
      />
      <div
        className="image-content"
      >
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
      <CardText>
        <span>
          {image.width} x {image.height} pixels
        </span>
        {' '}
        <span>
          {image.fileSizeHuman}
        </span>
      </CardText>
    </Card>
  );
}

Image.defaultProps = {
  image: null,
};
