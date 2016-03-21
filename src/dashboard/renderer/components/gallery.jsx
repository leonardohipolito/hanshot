var React = electronRequire('react');
var electron = electronRequire('electron');

var Gallery = React.createClass({
  getInitialState: function () {
    return {
      images: []
    };
  },
  componentWillMount: function () {
    electron.ipcRenderer.on('recent-updated', function (event, images) {
      console.log(images);
      this.setState({ images: images });
    }.bind(this));
    electron.ipcRenderer.send('recent-requested');
  },
  componentWillUnmoount: function () {
    electron.ipcRenderer.removeAllListeners('recent-updated');
  },
  renderEmpty: function () {
    return (
      <div>No recent screenshots</div>
    );
  },
  render: function () {
    if (this.state.images.length === 0) {
      return this.renderEmpty();
    }

    var thumbNodes = this.state.images.map(function (image) {
      return (
        <div className="col-sm-6 col-md-4" key={image.fileName}>
          <div className="thumbnail">
            <img src={image.dataURL} />
            <div className="caption">
              <h3>{image.fileName}</h3>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="row">
        {thumbNodes}
      </div>
    );
  }
});

module.exports = Gallery;
