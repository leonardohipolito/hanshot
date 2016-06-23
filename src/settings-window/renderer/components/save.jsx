'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var React = require('react');

import viewDispatch from '../view-dispatch';
import * as appActions from '../../../actions';

var Checkbox = require('./common/checkbox.jsx');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// Container component
var Save = React.createClass({
  render: function () {
    return (
      <div>
        <h4>Save</h4>
        <div className="form-group">
          <Checkbox
            checked={this.props.settings['save-dir-selected']}
            onChange={function (value) {
              viewDispatch(appActions.updateSetting('save-dir-selected', value));
            }}
          >
            Auto save to directory
          </Checkbox>
          <div
            className={this.props.settings['save-dir-selected'] ? '' : 'disabled-area'}
          >
            Directory: {this.props.settings['save-dir-path']}
            <button className="btn btn-default"
              disabled={!this.props.settings['save-dir-selected']}
              onClick={function () {
                viewDispatch(appActions.showDialogToPickSaveDir());
              }}
            >
              Change
            </button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Save;
