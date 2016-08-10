//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import Button from './button.jsx';

import './dropdown.css';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export function DropdownItem(props) {
  return (
    <li
      onClick={props.onClick}
    >
      {props.children}
    </li>
  );
}

DropdownItem.propTypes = {
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
};

//------------------------------------------------------------------------------

export class Dropdown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick(event) {
    const isDropdown = event.target === this.refs.dropdown;
    const isDropdownMember = this.refs.dropdown.contains(event.target);
    if (!(isDropdown || isDropdownMember)) {
      this.hide();
    }
  }

  handleToggle() {
    this.toggle();
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  hide() {
    this.setState({ isOpen: false });
  }

  render() {
    const className = ['dropdown'];
    if (this.state.isOpen) {
      className.push('dropdown-is-open');
    }
    if (this.props.menuLeft) {
      className.push('dropdown-menu-left');
    }

    return (
      <div
        ref="dropdown"
        className={className.join(' ')}
      >
        <Button
          onClick={this.handleToggle}
        >
          {this.props.title}
        </Button>
        <ul>
          {React.Children.map(this.props.children, (child) => {
            if (child.type !== DropdownItem) {
              return child;
            }
            return React.cloneElement(child, {
              onClick: () => {
                this.hide();
                child.props.onClick();
              },
            });
          })}
        </ul>
      </div>
    );
  }

}

Dropdown.propTypes = {
  title: React.PropTypes.string,
  menuLeft: React.PropTypes.bool,
  children: React.PropTypes.node,
};

Dropdown.defaultProps = {
  title: '',
  menuLeft: false,
};
