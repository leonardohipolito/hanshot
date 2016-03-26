var React = electronRequire('react');
var electron = electronRequire('electron');

var ipcRenderer = electron.ipcRenderer;

var SnapDesktop = React.createClass({
  handleDefault: function () {
    ipcRenderer.send('snapshot-initiated', {
      type: 'selection'
    });
  },
  handleSelected: function (displayId) {
    ipcRenderer.send('snapshot-initiated', {
      type: 'selection',
      displayId: displayId
    });
  },
  renderButton: function () {
    return (
      <button type="button" className="btn btn-default"
        onClick={this.handleDefault}
      >
        {' Selection '}
      </button>
    );
  },
  renderListNode: function (display) {
    return (
      <li key={display.id}
        onClick={this.handleSelected.bind(this, display.id)}
      >
        <a href="#">{display.name}</a>
      </li>
    );
  },
  render: function () {
    if (this.props.displays.length < 2) {
      return this.renderButton();
    }

    var listNodes = this.props.displays.map(this.renderListNode);

    return (
      <div className="btn-group">
        <button type="button"
          className="btn btn-default" onClick={this.handleDefault}
        >
          {' Selection '}
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

module.exports = SnapDesktop;
