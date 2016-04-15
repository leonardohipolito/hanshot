var React = electronRequire('react');

function DropdownItem(props) {
  return (
    <li>
      <a href="#">
        {props.children}
      </a>
    </li>
  );
}

module.exports = DropdownItem;
