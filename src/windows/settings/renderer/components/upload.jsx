var React = electronRequire('react');
var _ = electronRequire('lodash');

var Radio = require('./common/radio.jsx');

var actions = require('../actions');

// Container component
var Upload = React.createClass({
  render: function () {

    console.log(this.props);

    var hosts = this.props.metadata.uploadHosts;
    if (!(hosts && hosts.length)) {
      return null;
    }

    return (
      <div>
        <h4>Upload</h4>
        <div className="form-group">
          {hosts.map(function (host) {
            return (
              <Radio
                key={host.id}
                value={host.id}
                name="upload-host"
                checked={host.id === this.props.settings['default-uploader']}
                onChange={function (value) {
                  actions.updateSetting('default-uploader', value);
                }}
              >
                {host.name}
              </Radio>
            );
          }, this)}
        </div>
      </div>
    );
  }
});

module.exports = Upload;
