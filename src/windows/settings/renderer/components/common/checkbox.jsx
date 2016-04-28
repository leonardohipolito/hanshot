var React = require('react');

// Representation component
function Checkbox(props) {
  return (
    <div className="checkbox">
      <label>
        <input type="checkbox"
          checked={props.checked}
          onChange={function (event) {
            props.onChange(event.target.checked)
          }}
        />
        {props.children}
      </label>
    </div>
  );
}

module.exports = Checkbox;
