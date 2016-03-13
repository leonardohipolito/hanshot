var React = electronRequire('react');
var ReactDOM = electronRequire('react-dom');
var electron = electronRequire('electron');

var IndexPage = require('./components/index-page.jsx');
var SettingsPage = require('./components/settings-page.jsx');

var App = React.createClass({
  getInitialState: function () {
    // TODO: replace with react-router
    return {
      pages: {
        index: 'Index',
        settings: 'Settings'
      },
      page: 'index'
    };
  },
  handleNavigation: function (page) {
    this.setState({
      page: page
    });
  },
  render: function () {

    var menuNodes = Object.keys(this.state.pages).map(function (page) {
      return (
        <li key={page}
          className={page === this.state.page ? 'active' : ''}
          onClick={this.handleNavigation.bind(this, page)}
        >
          <a href="#">{this.state.pages[page]}</a>
        </li>
      );
    }, this);

    var Page = IndexPage;
    if (this.state.page === 'settings') {
      Page = SettingsPage;
    }

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              {menuNodes}
            </ul>
          </div>
        </nav>
        <Page />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
