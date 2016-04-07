var React = electronRequire('react');

var actions = require('../actions');

var TrayOnClose = React.createClass({
  getInitialState: function () {
    return {
      isChecked: this.props.trayOnClose
    }
  },
  componentWillReceiveProps: function (newProps) {
    if (newProps.trayOnClose !== this.state.isChecked) {
      this.setState({ isChecked: newProps.trayOnClose });
    }
  },
  handleChange: function (event) {
    this.setState({ isChecked: event.target.checked });
    actions.updateSetting('tray-on-close', event.target.checked);
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
            Minimize to tray on close
          </label>
        </div>
      </div>
    );
  }
});

module.exports = TrayOnClose;
