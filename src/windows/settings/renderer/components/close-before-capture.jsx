var React = electronRequire('react');

var actions = require('../actions');

var CloseBeforeCapture = React.createClass({
  getInitialState: function () {
    return {
      isChecked: this.props.closeBeforeCapture
    }
  },
  componentWillReceiveProps: function (newProps) {
    if (newProps.closeBeforeCapture !== this.state.isChecked) {
      this.setState({ isChecked: newProps.closeBeforeCapture });
    }
  },
  handleChange: function (event) {
    this.setState({ isChecked: event.target.checked });
    actions.updateSetting('close-before-capture', event.target.checked);
  },
  render: function () {
    return (
      <div className="form-group">
        <div className="checkbox">
          <label>
            <input type="checkbox"
              checked={this.state.isChecked}
              onChange={this.handleChange}
            />
            Close before capture
          </label>
        </div>
      </div>
    );
  }
});

module.exports = CloseBeforeCapture;
