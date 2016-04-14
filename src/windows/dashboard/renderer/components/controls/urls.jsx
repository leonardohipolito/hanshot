var React = electronRequire('react');

var actions = require('../../actions');

var Urls = React.createClass({
  handleDefault: function () {
    actions.copy(this.props.image.filePath);
  },
  handleSelected: function (copyId, event) {
    actions.copy(this.props.image.filePath, copyId);
  },
  render: function () {
    var image = this.props.image;

    if (!(image && image.publicUrls && image.publicUrls.length)) {
      return null;
    }

    return (
      <div className="btn-group">
        <button type="button"
          className="btn btn-default dropdown-toggle" data-toggle="dropdown"
        >
          {' Public URLs '}
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu dropdown-menu-right fixed-dropdown">
          {image.publicUrls.map(function (url, index) {
            return (
              <li key={index}
                onClick={function () {
                  actions.copyText(url);
                }}
              >
                <a href="#">{url}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
});

module.exports = Urls;
