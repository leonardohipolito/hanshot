var React = electronRequire('react');
var electron = electronRequire('electron');

var Image = React.createClass({
  getDefaultProps: function () {
    return {
      image: {}
    };
  },
  upload: function (uploader) {
    electron.ipcRenderer.send('upload-requested', {
      uploader: uploader,
      filePath: this.props.image.filePath
    });
  },
  copy: function (type) {
    electron.ipcRenderer.send('copy-requested', {
      type: type,
      filePath: this.props.image.filePath
    });
  },
  renderEmpty: function () {
    return (
      <center>No recent screenshots</center>
    );
  },
  render: function () {
    if (!this.props.image.dataURL) {
      return this.renderEmpty();
    }

    return (
      <div className="panel panel-default image-container">
        <div className="panel-heading">{this.props.image.fileName}</div>
        <div className="panel-body image-body">
          <div
            className="image"
            style={{
              backgroundImage: 'url(' + this.props.image.dataURL + ')',
              maxWidth: this.props.image.width,
              maxHeight: this.props.image.height
            }}
          ></div>
        </div>
        <div className="panel-footer image-info">
          <span>
            {this.props.image.width} x {this.props.image.height} pixels
          </span>
        </div>
      </div>
    );
  }
});

module.exports = Image;
