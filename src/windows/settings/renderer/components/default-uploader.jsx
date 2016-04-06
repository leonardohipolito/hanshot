var React = electronRequire('react');
var _ = electronRequire('lodash');

var actions = require('../actions');

var DefaultUploader = React.createClass({
  getInitialState: function () {
    return {
      selectedUploaderId: this.getDefaultUploader(this.props.uploaders)
    };
  },
  getDefaultProps: function () {
    return {
      uploaders: []
    };
  },
  componentWillReceiveProps: function (newProps) {
    var newDefaultUploader = this.getDefaultUploader(newProps.uploaders);
    if (newDefaultUploader.id !== this.state.selectedUploaderId) {
      this.setState({ selectedUploaderId: newDefaultUploader.id });
    }
  },
  isChecked: function (uploader) {
    return uploader.id === this.state.selectedUploaderId;
  },
  getDefaultUploader: function (uploaders) {
    return _.find(uploaders, { isDefault: true });
  },
  handleChange: function (event) {
    this.setState({ selectedUploaderId: event.target.value });
    actions.updateSetting('default_uploader', event.target.value);
  },
  renderRadioItem: function (uploader) {
    return (
      <div key={uploader.id} className="radio">
        <label>
          <input type="radio"
            name="defaultUploader"
            value={uploader.id}
            checked={this.isChecked(uploader)}
            onChange={this.handleChange}
          />
          {uploader.name}
        </label>
      </div>
    );
  },
  render: function () {

    var radioItems = this.props.uploaders.map(this.renderRadioItem);

    return (
      <div className="form-group">
        {radioItems}
      </div>
    );
  }
});

module.exports = DefaultUploader;
