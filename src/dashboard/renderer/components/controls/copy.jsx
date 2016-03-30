var React = electronRequire('react');

var actions = require('../../actions');

var Copy = React.createClass({
  handleDefault: function () {
    actions.copy(this.props.image.filePath);
  },
  handleSelected: function (copyId, event) {
    actions.copy(this.props.image.filePath, copyId);
  },
  render: function () {

    if (!this.props.image) {
      return null;
    }

    return (
      <div className="btn-group">
        <button type="button"
          className="btn btn-default" onClick={this.handleDefault}
        >
          {' Copy '}
        </button>
        <button type="button"
          className="btn btn-default dropdown-toggle"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
        >
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu dropdown-menu-right">
          <li key="image" onClick={this.handleSelected.bind(this, 'image')}>
            <a href='#'>Image</a>
          </li>
          <li key="filePath" onClick={this.handleSelected.bind(this, 'filePath')}>
            <a href='#'>File path</a>
          </li>
          <li key="fileName" onClick={this.handleSelected.bind(this, 'fileName')}>
            <a href='#'>File name</a>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = Copy;
