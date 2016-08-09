//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import Button from './button.jsx';

import './range.css';

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
    let newValue = this.state.value - this.props.step;
    if (newValue < this.props.min) {
      newValue = this.props.min;
    }
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  }

  handleIncrement() {
    let newValue = this.state.value + this.props.step;
    if (newValue > this.props.max) {
      newValue = this.props.max;
    }
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  }

  isDecrementAvailable() {
    return this.state.value > this.props.min;
  }

  isIncrementAvailable() {
    return this.state.value < this.props.max;
  }

  render() {
    return (
      <div className="range">
        <Button
          disabled={!this.isDecrementAvailable()}
          onClick={this.handleDecrement}
        >
          &lt;
        </Button>
        <div className="range-value">
          {this.state.value}
        </div>
        <Button
          disabled={!this.isIncrementAvailable()}
          onClick={this.handleIncrement}
        >
          &gt;
        </Button>
      </div>
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
