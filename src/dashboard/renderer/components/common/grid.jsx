//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import './grid.css';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export function RowContainer(props) {
  let className = 'grid-container-row';
  if (props.className) {
    className = `${className} ${props.className}`;
  }
  return (
    <div className={className}>
      {props.children}
    </div>
  );
}

RowContainer.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

RowContainer.defaultProps = {
  className: '',
};

//------------------------------------------------------------------------------

export function ColumnContainer(props) {
  let className = 'grid-container-column';
  if (props.className) {
    className = `${className} ${props.className}`;
  }
  return (
    <div className={className}>
      {props.children}
    </div>
  );
}

ColumnContainer.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

ColumnContainer.defaultProps = {
  className: '',
};
