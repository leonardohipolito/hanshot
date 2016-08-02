//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { updateSetting } from '../../../../actions';

import Checkbox from 'material-ui/Checkbox';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Behavior(props) {
  return (
    <div>
      <div className="form-group">
        <Checkbox
          label="Close dashboard before capture"
          checked={props.settings['close-before-capture']}
          onCheck={(event, isChecked) => {
            viewDispatch(updateSetting('close-before-capture', isChecked));
          }}
        />
      </div>
      <div className="form-group">
        <Checkbox
          label="Open dashboard after capture"
          checked={props.settings['open-after-capture']}
          onCheck={(event, isChecked) => {
            viewDispatch(updateSetting('open-after-capture', isChecked));
          }}
        />
      </div>
      <div className="form-group">
        <Checkbox
          label="Minimize app to tray when closing dashboard"
          checked={props.settings['tray-on-close']}
          onCheck={(event, isChecked) => {
            viewDispatch(updateSetting('tray-on-close', isChecked));
          }}
        />
      </div>
      <div className="form-group">
        <Checkbox
          label="Upload after capture"
          checked={props.settings['upload-after-capture']}
          onCheck={(event, isChecked) => {
            viewDispatch(updateSetting('upload-after-capture', isChecked));
          }}
        />
      </div>
      <div className="form-group">
        <Checkbox
          label="Show dashboard on app start"
          checked={props.settings['show-on-start']}
          onCheck={(event, isChecked) => {
            viewDispatch(updateSetting('show-on-start', isChecked));
          }}
        />
      </div>
    </div>
  );
}
