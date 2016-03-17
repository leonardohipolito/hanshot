var React = electronRequire('react');
var ReactDOM = electronRequire('react-dom');

var ActionPanel = require('./components/action-panel.jsx');

var Dashboard = React.createClass({
  render: function () {
    return (
      <div className="container-fluid">
        <ActionPanel />
      </div>
    );
  }
});

ReactDOM.render(
  <Dashboard />,
  document.getElementById('dashboard')
);
