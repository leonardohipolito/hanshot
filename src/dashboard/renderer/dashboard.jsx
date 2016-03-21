var React = electronRequire('react');
var ReactDOM = electronRequire('react-dom');

var ActionPanel = require('./components/action-panel.jsx');
var Gallery = require('./components/gallery.jsx');

var Dashboard = React.createClass({
  render: function () {
    return (
      <div className="container-fluid">
        <ActionPanel />
        <Gallery />
      </div>
    );
  }
});

ReactDOM.render(
  <Dashboard />,
  document.getElementById('dashboard')
);
