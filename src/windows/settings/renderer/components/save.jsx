var React = electronRequire('react');

var Checkbox = require('./common/checkbox.jsx');

var actions = require('../actions');

// Container component
var Save = React.createClass({
  openDialog: function () {
    actions.openDialog();
  },
  render: function () {
    return (
      <div>
        <h4>Save</h4>
        <div className="form-group">
          <Checkbox
            checked={this.props.settings['auto-save']}
            onChange={function (value) {
              actions.updateSetting('auto-save', value);
            }}
          >
            Auto save to directory
          </Checkbox>
          <div
            className={this.props.settings['auto-save'] ? '' : 'disabled-area'}
          >
            Directory: {this.props.settings['save-dir']}
            <button className="btn btn-default"
              disabled={!this.props.settings['auto-save']}
              onClick={function () {
                actions.openDialog();
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
