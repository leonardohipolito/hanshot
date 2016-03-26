var React = electronRequire('react');
var ReactDOM = electronRequire('react-dom');

var Navbar = require('./components/navbar.jsx');
var Image = require('./components/image.jsx');

var Dashboard = React.createClass({
  render: function () {
    return (
      <div className="dashboard-container">
        <Navbar />
        <div className="image-container">
          <Image />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Dashboard />,
  document.getElementById('dashboard')
);
