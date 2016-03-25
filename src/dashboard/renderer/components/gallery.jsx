var React = electronRequire('react');
var electron = electronRequire('electron');

var Gallery = React.createClass({
  getInitialState: function () {
    return {
      recent: [],
      image: {},
      index: 0,
      cache: {}
    };
  },
  componentWillMount: function () {
    electron.ipcRenderer.on('recent-updated', function (event, recent) {
      this.setState({ recent: recent });
      this.fetchImage(0);
    }.bind(this));
    electron.ipcRenderer.send('recent-requested');

    electron.ipcRenderer.on('image-updated', function (event, image) {
      this.setState({ image: image });
      this.state.cache[image.filePath] = image;
    }.bind(this));
  },
  componentWillUnmoount: function () {
    electron.ipcRenderer.removeAllListeners('recent-updated');
    electron.ipcRenderer.removeAllListeners('image-updated');
  },
  fetchImage: function (index) {
    var image = this.state.recent[index];
    if (!image) {
      return;
    }
    this.setState({ image: image });
    if (this.state.cache[image.filePath]) {
      this.setState({ image: this.state.cache[image.filePath] });
    } else {
      electron.ipcRenderer.send('image-requested', {
        filePath: image.filePath
      });
    }
  },
  prev: function () {
    var index = this.state.index;
    if (index === this.state.recent.length - 1) {
      return false;
    }
    this.setState({ index: index + 1 });
    this.fetchImage(index + 1);
  },
  next: function () {
    var index = this.state.index;
    if (index === 0) {
      return false;
    }
    this.setState({ index: index - 1 });
    this.fetchImage(index - 1);
  },
  upload: function (uploader) {
    var image = this.state.recent[this.state.index];
    if (!image) {
      return;
    }
    electron.ipcRenderer.send('upload-requested', {
      uploader: uploader,
      filePath: image.filePath
    });
  },
  copy: function (type) {
    var image = this.state.recent[this.state.index];
    if (!image) {
      return;
    }
    electron.ipcRenderer.send('copy-requested', {
      type: type,
      filePath: image.filePath
    });
  },
  renderEmpty: function () {
    return (
      <div>No recent screenshots</div>
    );
  },
  render: function () {
    if (this.state.recent.length === 0) {
      return this.renderEmpty();
    }

    var imageNode = (<div>Loading ...</div>);
    if (this.state.image.dataURL) {
      if (this.state.image.exists) {
        imageNode = (<img src={this.state.image.dataURL} />);
      } else {
        imageNode = (<div>Image file does not exist</div>);
      }
    }

    return (
      <div className="thumbnail">
        {imageNode}
        <div className="caption">
          <h3>{this.state.image.fileName}</h3>
          <p>
            <button className="btn btn-default" onClick={this.prev}>Prev</button>
            <button className="btn btn-default" onClick={this.next}>Next</button>
            <button className="btn btn-primary" onClick={this.upload.bind(this, 'imgur')}>Upload (imgur)</button>
            <button className="btn btn-primary" onClick={this.upload.bind(this, 'dropbox')}>Upload (dropbox)</button>
            <button className="btn btn-info" onClick={this.copy.bind(this, 'image')}>Copy image</button>
            <button className="btn btn-info" onClick={this.copy.bind(this, 'fileName')}>Copy file name</button>
            <button className="btn btn-info" onClick={this.copy.bind(this, 'filePath')}>Copy file path</button>
          </p>
        </div>
      </div>
    );
  }
});

module.exports = Gallery;
