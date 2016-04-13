var React = electronRequire('react');

var Alert = require('./alert.jsx');

var actions = require('../actions');

var AlertArea = React.createClass({
  getDefaultProps: function () {
    return {
      alerts: []
    };
  },
  render: function () {
    return (
      <div className="error-container">
        {this.props.alerts.map(function (alert) {
          return (
            <Alert
              key={alert.id}
              type={alert.type}
              onClose={function () {
                actions.closeAlert(alert.id)
              }}
            >
              <p>
                {alert.message}
              </p>
              <p>
                {(alert.buttons || []).map(function (button, index) {
                  return [
                    <button
                      className={'btn btn-' + button.type}
                      onClick={function () {
                        if (button.role === 'action') {
                          actions.send(button.action);
                        }
                        actions.closeAlert(alert.id);
                      }}
                    >
                      {button.title}
                    </button>,
                    ' '
                  ];
                }, this)}
              </p>
            </Alert>
          );
        }, this)}
      </div>
    );
  }
});

module.exports = AlertArea;
