var React = electronRequire('react');
var electron = electronRequire('electron');

var Upload = React.createClass({
  getDefaultProps: function () {
    return {
      uploaders: []
    };
  },
  handleDefault: function () {

  },
  handleSelected: function () {

  },
  renderListNode: function (uploader) {
    return (
      <li key={uploader.id}
        onClick={this.handleSelected.bind(this, uploader.id)}
      >
        <a href="#">{uploader.name}</a>
      </li>
    );
  },
  render: function () {

    if (!this.props.uploaders.length) {
      return null;
    }

    var listNodes = this.props.uploaders.map(this.renderListNode);

    return (
      <div className="btn-group">
        <button type="button"
          className="btn btn-default" onClick={this.handleDefault}
        >
          {' Upload '}
        </button>
        <button type="button"
          className="btn btn-default dropdown-toggle"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
        >
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          {listNodes}
        </ul>
      </div>
    );

  }
});

module.exports = Upload;
