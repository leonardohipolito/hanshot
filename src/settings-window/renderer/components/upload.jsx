//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../view-dispatch';
import { updateSetting } from '../../../actions';

import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

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
      <h4>Upload</h4>
      <RadioButtonGroup
        name="upload"
        valueSelected={props.settings['default-uploader']}
        onChange={(event, value) => {
          viewDispatch(updateSetting('default-uploader', value));
        }}
      >
        {hosts.map((host) =>
          <RadioButton
            label={host.name}
            key={host.id}
            value={host.id}
          />
        )}
      </RadioButtonGroup>
    </div>
  );
}
