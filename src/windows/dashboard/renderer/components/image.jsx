'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var React = electronRequire('react');
var electron = electronRequire('electron');

var viewDispatch = require('../view-dispatch');
var appActions = require('../../../../app/actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

var Image = React.createClass({
  getDefaultProps: function () {
    return {
      image: null
    };
  },
  renderEmpty: function () {
    return (
      <center>No recent screenshots</center>
    );
  },
  render: function () {
    var image = this.props.image;
    if (!image) {
      return this.renderEmpty();
    }
    return (
      <div className="panel panel-default image-container">
        <div className="panel-heading image-title">
          {image.fileName}
        </div>
        <div className="panel-body image-content">
          <div
            className="image"
            onContextMenu={function () {
              viewDispatch(appActions.contextMenu(image.filePath));
            }}
            style={{
              backgroundImage: 'url(' + image.dataURL + ')',
              maxWidth: image.width,
              maxHeight: image.height
            }}
          ></div>
        </div>
        <div className="panel-footer image-info">
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
});

module.exports = Image;
