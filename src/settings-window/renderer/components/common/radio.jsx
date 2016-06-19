var React = require('react');

function Radio(props) {
  return (
    <div className="radio">
      <label>
        <input
          type="radio"
          name={props.name}
          value={props.value}
          checked={props.checked}
          onChange={function (event) {
            props.onChange(event.target.value);
          }}
        />
        {props.children}
      </label>
    </div>
  );
}

module.exports = Radio;