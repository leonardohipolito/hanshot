var React = electronRequire('react');
var electron = electronRequire('electron');

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
    if (!this.props.image) {
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
