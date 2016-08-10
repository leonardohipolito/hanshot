//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export function MenuItem(props) {
  const className = [];
  if (props.active) {
    className.push('active');
  }

  return (
    <li
      className={className.join(' ')}
      onClick={props.onClick}
    >
      {props.children}
    </li>
  );
}

MenuItem.propTypes = {
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
};

// --

export function Menu(props) {
  return (
    <ul>
      {React.Children.map(props.children, (child) => {
        if (child.type !== MenuItem) {
          return child;
        }
        return React.cloneElement(child, {
          active: props.value === child.props.value,
          onClick: () => {
            props.onSelect(child.props.value);
          },
        });
      })}
    </ul>
  );
}

Menu.propTypes = {
  value: React.PropTypes.string,
  children: React.PropTypes.node,
  onSelect: React.PropTypes.func,
};
