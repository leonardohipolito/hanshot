'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var React = electronRequire('react');

var viewDispatch = require('../view-dispatch');
var appActions = require('../../../../app/actions');

var Checkbox = require('./common/checkbox.jsx');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// Container component
var Behavior = React.createClass({
  render: function () {
    return (
      <div>
        <h4>Behavior</h4>
        <div className="form-group">
          <Checkbox
            checked={this.props.settings['close-before-capture']}
            onChange={function (value) {
              viewDispatch(appActions.updateSetting('close-before-capture', value));
            }}
          >
            Close dashboard before capture
          </Checkbox>
        </div>
        <div className="form-group">
          <Checkbox
            checked={this.props.settings['open-after-capture']}
            onChange={function (value) {
              viewDispatch(appActions.updateSetting('open-after-capture', value));
            }}
          >
            Open dashboard after capture
          </Checkbox>
        </div>
        <div className="form-group">
          <Checkbox
            checked={this.props.settings['tray-on-close']}
            onChange={function (value) {
              viewDispatch(appActions.updateSetting('tray-on-close', value));
            }}
          >
            Minimize app to tray when closing dashboard
          </Checkbox>
        </div>
        <div className="form-group">
          <Checkbox
            checked={this.props.settings['upload-after-capture']}
            onChange={function (value) {
              viewDispatch(appActions.updateSetting('upload-after-capture', value));
            }}
          >
            Upload after capture
          </Checkbox>
        </div>
        <div className="form-group">
          <Checkbox
            checked={this.props.settings['show-on-start']}
            onChange={function (value) {
              viewDispatch(appActions.updateSetting('show-on-start', value));
            }}
          >
            Show dashboard on app start
          </Checkbox>
        </div>
      </div>
    );
  }
});

module.exports = Behavior;
