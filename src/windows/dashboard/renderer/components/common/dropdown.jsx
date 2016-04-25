var React = electronRequire('react');

function Dropdown(props) {
  return (
    <div className="btn-group">
      <div className="dropdown">
        <button type="button"
          className="btn btn-default dropdown-toggle"
          data-toggle="dropdown"
        >
          {' ' + props.title + ' '}
          <span className="caret"></span>
        </button>
        <ul
          className={[
            'dropdown-menu',
            (props.alignMenuRight ? 'dropdown-menu-right' : '')
          ].join(' ')}
        >
          {props.children}
        </ul>
      </div>
    </div>
  );
}

module.exports = Dropdown;
