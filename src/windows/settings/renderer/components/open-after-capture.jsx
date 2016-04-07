var React = electronRequire('react');

var actions = require('../actions');

var OpenAfterCapture = React.createClass({
  getInitialState: function () {
    return {
      isChecked: this.props.openAfterCapture
    }
  },
  componentWillReceiveProps: function (newProps) {
    if (newProps.openAfterCapture !== this.state.isChecked) {
      this.setState({ isChecked: newProps.openAfterCapture });
    }
  },
  handleChange: function (event) {
    this.setState({ isChecked: event.target.checked });
    actions.updateSetting('open-after-capture', event.target.checked);
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
            Open after capture
          </label>
        </div>
      </div>
    );
  }
});

module.exports = OpenAfterCapture;
