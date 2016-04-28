var React = require('react');

function Button(props) {
  return (
    <button
      type="button"
      className="btn btn-default"
      {...props}
    >
      {props.children}
    </button>
  );
}

module.exports = Button;
