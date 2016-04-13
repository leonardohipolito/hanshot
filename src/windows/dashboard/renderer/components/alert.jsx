var React = electronRequire('react');

function Alert(props) {

  var type = props.type || 'danger';

  return (
    <div className={'alert alert-dismissible alert-' + type}>
      <button
        type="button" className="close"
        onClick={props.onClose}
      >
        <span>&times;</span>
      </button>
      {props.children}
    </div>
  );
}

module.exports = Alert;
