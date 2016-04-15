var React = electronRequire('react');

var Checkbox = require('./common/checkbox.jsx');

var actions = require('../actions');

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
              actions.updateSetting('close-before-capture', value);
            }}
          >
            Close before capture
          </Checkbox>
        </div>
        <div className="form-group">
          <Checkbox
            checked={this.props.settings['open-after-capture']}
            onChange={function (value) {
              actions.updateSetting('open-after-capture', value);
            }}
          >
            Open after capture
          </Checkbox>
        </div>
        <div className="form-group">
          <Checkbox
            checked={this.props.settings['tray-on-close']}
            onChange={function (value) {
              actions.updateSetting('tray-on-close', value);
            }}
          >
            Minimize to tray on close
          </Checkbox>
        </div>
      </div>
    );
  }
});

module.exports = Behavior;
