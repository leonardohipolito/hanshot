var React = electronRequire('react');

var Range = React.createClass({
  getInitialState: function () {
    return {
      value: this.props.initialValue
    };
  },
  dec: function () {
    var newValue = this.state.value - this.props.step;
    if (newValue < this.props.min) {
      newValue = this.props.min;
    }
    if (this.state.value !== newValue) {
      this.setState({ value: newValue });
      this.props.onChange(newValue);
    }
  },
  inc: function () {
    var newValue = this.state.value + this.props.step;
    if (newValue > this.props.max) {
      newValue = this.props.max;
    }
    if (this.state.value !== newValue) {
      this.setState({ value: newValue });
      this.props.onChange(newValue);
    }
  },
  render: function () {
    return (
      <span>
        <button type="button" className="btn btn-default btn-xs" onClick={this.dec}>
          <span className="glyphicon glyphicon-triangle-left"></span>
        </button>
        {' '}
        {this.state.value}
        {' '}
        <button type="button" className="btn btn-default btn-xs" onClick={this.inc}>
          <span className="glyphicon glyphicon-triangle-right"></span>
        </button>
      </span>
    );
  }
});

module.exports = Range;
