var React = electronRequire('react');

function DropdownItem(props) {
  return (
    <li {...props}>
      <a href="#">
        {props.children}
      </a>
    </li>
  );
}

module.exports = DropdownItem;
