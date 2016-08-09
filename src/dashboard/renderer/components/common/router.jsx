//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export function Route(props) {
  return props.children;
}

Route.propTypes = {
  children: React.PropTypes.node,
};


export function Router(props) {
  let route = null;
  React.Children.forEach(props.children, (child) => {
    if (child.type !== Route) {
      return;
    }
    if (child.props.value === props.value) {
      route = child;
    }
  });
  return route;
}

Router.propTypes = {
  value: React.PropTypes.string,
  children: React.PropTypes.node,
};
