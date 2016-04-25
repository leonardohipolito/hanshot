'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var React = electronRequire('react');
var electron = electronRequire('electron');

var SnapDesktop = require('./controls/snap-desktop.jsx');
var SnapSelection = require('./controls/snap-selection.jsx');
var Upload = require('./controls/upload.jsx');
var Copy = require('./controls/copy.jsx');
var Urls = require('./controls/urls.jsx');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// TODO: do not use navbar in data flow, just as a component container
var Navbar = React.createClass({
  getDefaultProps: function () {
    return {
      displays: [],
      metadata: {}
    };
  },
  render: function () {

    // TODO: looks bad
    var imageControls;
    if (this.props.image) {
      imageControls = (
        <div className="navbar-btn pull-right">
          <Urls
            image={this.props.image}
          />
          {' '}
          <Copy
            image={this.props.image}
          />
          {' '}
          <Upload
            metadata={this.props.metadata}
            image={this.props.image}
          />
        </div>
      );
    }

    return (
      <nav className="navbar navbar-default dashboard-navbar">
        <div className="container-fluid">
          <div className="navbar-btn pull-left">
            <SnapDesktop displays={this.props.displays} />
            {' '}
            <SnapSelection displays={this.props.displays} />
          </div>
          {imageControls}
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;
