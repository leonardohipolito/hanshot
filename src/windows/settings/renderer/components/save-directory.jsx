var React = electronRequire('react');

var actions = require('../actions');

var SaveDirectory = React.createClass({
  getInitialState: function () {
    return {
      autoSaveChecked: this.props.autoSave
    };
  },
  componentWillReceiveProps: function(newProps) {
    if (newProps.autoSave !== this.state.autoSaveChecked) {
      this.setState({ autoSaveChecked: newProps.autoSave });
    }
  },
  handleChange: function (event) {
    this.setState({ autoSaveChecked: event.target.checked });
    actions.updateSetting('auto-save', event.target.checked);
  },
  openDialog: function () {
    actions.openDialog();
  },
  render: function () {
    return (
      <div className="form-group">
        <div className="checkbox">
          <label>
            <input type="checkbox"
              checked={this.state.autoSaveChecked}
              onChange={this.handleChange}
            />
            Auto save to directory
          </label>
        </div>
        <div className={!this.state.autoSaveChecked ? 'disabled-area' : ''}>
          Directory: {this.props.saveDir}
          <button className="btn btn-default"
            onClick={this.openDialog}
            disabled={!this.state.autoSaveChecked}
          >
            Change
          </button>
        </div>
      </div>
    );
  }
});

module.exports = SaveDirectory;
