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
            checked={this.props.settings['save-dir-selected']}
            onChange={function (value) {
              actions.updateSetting('save-dir-selected', value);
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
