var React = electronRequire('react');
var electron = electronRequire('electron');

var ipcRenderer = electron.ipcRenderer;

var SnapDesktop = require('./controls/snap-desktop.jsx');
var SnapSelection = require('./controls/snap-selection.jsx');
var SnapWindow = require('./controls/snap-window.jsx');
var Upload = require('./controls/upload.jsx');

// TODO: do not use navbar in data flow, just as a component container
var Navbar = React.createClass({
  getDefaultProps: function () {
    return {
      displays: [],
      windows: [],
      uploaders: []
    };
  },
  render: function () {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-btn pull-left">
            <SnapDesktop displays={this.props.displays} />
            {' '}
            <SnapSelection displays={this.props.displays} />
            {' '}
            <SnapWindow windows={this.props.windows} />
          </div>
          <div className="navbar-btn pull-right">
            <Upload
              uploaders={this.props.uploaders}
              image={this.props.image}
            />
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;
