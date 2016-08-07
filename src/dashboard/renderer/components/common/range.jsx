//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Range extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement() {
    const newValue = this.state.value - this.props.step;
    if (newValue < this.props.min) {
      return;
    }
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  }

  handleIncrement() {
    const newValue = this.state.value + this.props.step;
    if (newValue > this.props.max) {
      return;
    }
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  }

  isDecrementAvailable() {
    return this.state.value - this.props.step >= this.props.min;
  }

  isIncrementAvailable() {
    return this.state.value + this.props.step <= this.props.max;
  }

  render() {
    return (
      <span>
        <button
          disabled={!this.isDecrementAvailable()}
          onClick={this.handleDecrement}
        >
          &lt;
        </button>
        <span>
          {this.state.value}
        </span>
        <button
          disabled={!this.isIncrementAvailable()}
          onClick={this.handleIncrement}
        >
          &gt;
        </button>
      </span>
    );
  }

}

Range.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  step: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  onChange: React.PropTypes.func,
};

Range.defaultProps = {
  step: 0.01,
  min: 0,
  max: 1,
};
