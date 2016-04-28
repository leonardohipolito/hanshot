var React = require('react');

function Select(props) {
  return (
    <select
      className="form-control"
      value={props.value}
      onChange={function (event) {
        props.onChange(event.target.value);
      }}
    >
      {props.children}
    </select>
  );
}

module.exports = Select;
