var React = electronRequire('react');

var Range = require('./common/range.jsx');

var actions = require('../actions');

var ImageFormat = React.createClass({
  getInitialState: function () {
    return {
      selectedFormat: this.props.imageFormat,
      jpgQuality: this.props.jpgQuality
    };
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({
      selectedFormat: newProps.imageFormat,
      jpgQuality: newProps.jpgQuality
    });
  },
  selectFormat: function (event) {
    var value = event.target.value;
    this.setState({ selectedFormat: value });
    actions.updateSetting('image-format', value);
  },
  handleJPGQualityChange: function (value) {
    this.setState({ jpgQuality: value });
    actions.updateSetting('jpg-quality', value);
  },
  renderJPGSettings: function () {
    return (
      <div className="form-group">
        Quality
        {' '}
        <Range
          initialValue={this.props.jpgQuality}
          min={0}
          max={100}
          step={10}
          onChange={this.handleJPGQualityChange}
        />
      </div>
    );
  },
  renderFormatOption: function (format) {
    return (
      <option key={format.id} value={format.id}>
        {format.name}
      </option>
    );
  },
  render: function () {

    var formats = [
      { id: 'jpg', name: 'JPEG' },
      { id: 'png', name: 'PNG' }
    ];

    var formatOptions = formats.map(this.renderFormatOption);

    var formatSettings = null;
    if (this.state.selectedFormat === 'jpg') {
      formatSettings = this.renderJPGSettings();
    }

    return (
      <div>
        <div className="form-group">
          <label htmlFor="image-format">Image format</label>
          <select id="image-format"
            className="form-control"
            value={this.state.selectedFormat}
            onChange={this.selectFormat}
          >
            {formatOptions}
          </select>
        </div>
        {formatSettings}
      </div>
    );
  }
});

module.exports = ImageFormat;
