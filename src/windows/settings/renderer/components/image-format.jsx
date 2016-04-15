var React = electronRequire('react');

var Range = require('./common/range.jsx');
var Select = require('./common/select.jsx');

var actions = require('../actions');

// Container component
var ImageFormat = React.createClass({
  render: function () {

    var formats = this.props.metadata.imageFormats;
    if (!(formats && formats.length)) {
      return null;
    }

    return (
      <div>
        <h4>Image format</h4>
        <div className="form-group">
          <Select
            value={this.props.settings['image-format']}
            onChange={function (value) {
              actions.updateSetting('image-format', value);
            }}
          >
            {formats.map(function (format) {
              return (
                <option key={format.id} value={format.id}>
                  {format.name}
                </option>
              );
            })}
          </Select>
        </div>
        {(function () {
          if (this.props.settings['image-format'] === 'jpg') {
            return (
              <div className="form-group">
                Quality
                {' '}
                <Range
                  initialValue={this.props.settings['jpg-quality']}
                  min={0}
                  max={100}
                  step={10}
                  onChange={function (value) {
                    actions.updateSetting('jpg-quality', value);
                  }}
                />
              </div>
            );
          }
        }).call(this)}
      </div>
    );
  }
});

module.exports = ImageFormat;
