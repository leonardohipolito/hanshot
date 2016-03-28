var React = electronRequire('react');
var electron = electronRequire('electron');

var Image = React.createClass({
  getInitialState: function () {
    return {};
  },
  componentWillMount: function () {
    electron.ipcRenderer.on('image-updated', function (event, image) {
      this.setState(image);
    }.bind(this));
    electron.ipcRenderer.send('image-requested');
  },
  componentWillUnmoount: function () {
    electron.ipcRenderer.removeAllListeners('image-updated');
  },
  upload: function (uploader) {
    electron.ipcRenderer.send('upload-requested', {
      uploader: uploader,
      filePath: this.state.filePath
    });
  },
  copy: function (type) {
    electron.ipcRenderer.send('copy-requested', {
      type: type,
      filePath: this.state.filePath
    });
  },
  renderEmpty: function () {
    return (
      <center>No recent screenshots</center>
    );
  },
  render: function () {
    if (!this.state.dataURL) {
      return this.renderEmpty();
    }

    return (
      <div className="panel panel-default image-container">
        <div className="panel-heading">{this.state.fileName}</div>
        <div className="panel-body image-body">
          <div
            className="image"
            style={{
              backgroundImage: 'url(' + this.state.dataURL + ')',
              maxWidth: this.state.width,
              maxHeight: this.state.height
            }}
          ></div>
        </div>
        <div className="panel-footer image-info">
          <span>
            {this.state.width} x {this.state.height} pixels
          </span>
        </div>
      </div>
    );
  }
});

module.exports = Image;
