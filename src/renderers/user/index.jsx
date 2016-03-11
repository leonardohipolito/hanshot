const React = electronRequire('react');
const ReactDOM = electronRequire('react-dom');
const electron = electronRequire('electron');

const ipcRenderer = electron.ipcRenderer;

const screens = electronRequire('../../shared/screens');


function Button(props) {
  return (
    <button type="button"
      className={'btn btn-' + (props.type || 'default')}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

var DisplayList = React.createClass({
  displayName: 'DisplayList',

  handleChange: function (event) {
    var select = event.target;
    var displayId = Number(select.options[select.selectedIndex].value);
    this.props.onChange(displayId);
  },

  render: function () {
    if (!(this.props.displays.length > 1)) {
      return false;
    }

    var placeholder = { id: '', name: 'Pick display...' };
    var displays = [placeholder].concat(this.props.displays);

    var options = displays.map(function (display) {
      return React.DOM.option(
        { value: display.id, key: display.id },
        display.name
      );
    });

    // TODO: it should not be a select
    return (
      React.DOM.select({ onChange: this.handleChange }, options)
    );
  }
});

var SnapDisplaysControl = React.createClass({
  displayName: 'SnapDisplaysControl',
  handleButtonClick: function () {
    this.props.onSnap({
      type: this.props.type
    });
  },
  handleListChange: function (displayId) {
    this.props.onSnap({
      type: this.props.type,
      displayId: displayId
    });
  },
  render: function () {
    return (
      React.DOM.div(null,
        React.createElement(Button, {
            onClick: this.handleButtonClick
          }, this.props.title
        ),
        React.createElement(DisplayList, {
          displays: this.props.displays,
          onChange: this.handleListChange
        })
      )
    );
  }
});

var SnapPanel = React.createClass({
  displayName: 'SnapPanel',
  getInitialState: function () {
    return { displays: screens.getNames() };
  },
  handleSnap: function (options) {
    ipcRenderer.send('snapshot-initiated', {
      type: options.type,
      displayId: options.displayId
    });
  },
  render: function () {
    return (
      React.DOM.div(null,
        React.createElement(SnapDisplaysControl, {
          type: 'desktop',
          title: 'Desktop',
          displays: this.state.displays,
          onSnap: this.handleSnap
        }),
        React.createElement(SnapDisplaysControl, {
          type: 'selection',
          title: 'Selection',
          displays: this.state.displays,
          onSnap: this.handleSnap
        })
      )
    );
  }
});

ReactDOM.render(
  React.createElement(SnapPanel, null),
  document.getElementById('app')
);
