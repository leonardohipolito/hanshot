var React = electronRequire('react');

var actions = require('../../actions');

var SnapWindow = React.createClass({
  handleSelected: function (windowId) {
    actions.snapWindow(windowId);
  },
  renderListNode: function (windowItem) {
    return (
      <li key={windowItem.id}
        onClick={this.handleSelected.bind(this, windowItem.id)}
      >
        <a href="#">{windowItem.name}</a>
      </li>
    );
  },
  render: function () {

    var listNodes = this.props.windows.map(this.renderListNode);

    return (
      <div className="btn-group">
        <div className="dropdown">
          <button type="button"
            className="btn btn-default dropdown-toggle"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
          >
            {' Window '}
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu windows-dropdown">
            {listNodes}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SnapWindow;
