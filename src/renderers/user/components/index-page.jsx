var React = electronRequire('react');

var ActionPanel = require('./action-panel.jsx');

function IndexPage() {
  return (
    <div>
      <ActionPanel />
    </div>
  );
}

module.exports = IndexPage;
