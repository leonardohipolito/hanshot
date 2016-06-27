//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var React = require('react');
var ReactDOM = require('react-dom');

import RendererIpc from '../../renderer-ipc.shim';

var ImageFormat = require('./components/image-format.jsx');
var Behavior = require('./components/behavior.jsx');
var Save = require('./components/save.jsx');
var Upload = require('./components/upload.jsx');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

const ipc = new RendererIpc('settings');

var Settings = React.createClass({
  getInitialState: function () {
    return {
      settings: {},
      metadata: {}
    };
  },
  componentWillMount: function () {
    ipc.onMessage('state-updated', this.onStateUpdated);
    ipc.sendMessage('ready');
  },
  componentWillUnmount: function () {
    ipc.offMessage('state-updated', this.onStateUpdated);
  },
  onStateUpdated: function (state) {
    this.setState(state);
  },
  render: function () {
    return (
      <div className="container-fluid">
        <form>
          <ImageFormat
            settings={this.state.settings}
            metadata={this.state.metadata}
          />
          <Behavior
            settings={this.state.settings}
          />
          <Save
            settings={this.state.settings}
          />
          <Upload
            settings={this.state.settings}
            metadata={this.state.metadata}
          />
        </form>
      </div>
    );
  }
});

ReactDOM.render(
  <Settings />,
  document.getElementById('settings')
);
