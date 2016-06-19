'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var React = require('react');

var viewDispatch = require('../view-dispatch');
import appActions from '../../../actions';

var Range = require('./common/range.jsx');
var Select = require('./common/select.jsx');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

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
              viewDispatch(appActions.updateSetting('image-format', value));
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
                    viewDispatch(appActions.updateSetting('jpg-quality', value));
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
