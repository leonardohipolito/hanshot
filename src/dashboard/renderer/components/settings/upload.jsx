//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '~/dashboard/renderer/view-dispatch.js';
import { updateSetting } from '~/actions';

import Radio from '../common/radio.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Upload(props) {
  const hosts = props.metadata.uploadHosts;
  if (!(hosts && hosts.length)) {
    return null;
  }

  return (
    <div>
      <h4>Default uploader</h4>
      {hosts.map((host) =>
        <Radio
          key={host.id}
          value={host.id}
          text={host.name}
          checked={host.id === props.settings['default-uploader']}
          name="default-uploader"
          onChange={(event, value) => {
            viewDispatch(updateSetting('default-uploader', value));
          }}
        />
      )}
    </div>
  );
}

Upload.propTypes = {
  settings: React.PropTypes.object,
  metadata: React.PropTypes.object,
};
