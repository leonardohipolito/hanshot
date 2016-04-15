var React = electronRequire('react');

function ButtonDropdown(props) {
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-default"
        onButtonClick={props.onButtonClick}
      >
        {' ' + props.title + ' '}
      </button>
      <button type="button"
          className="btn btn-default dropdown-toggle"
          data-toggle="dropdown"
        >
          <span className="caret"></span>
        </button>
        <ul className={[
            'dropdown-menu',
            (props.right ? 'dropdown-menu-right' : '')
          ].join(' ')}
        >
          {props.children}
        </ul>
    </div>
  );
}

module.exports = ButtonDropdown;
