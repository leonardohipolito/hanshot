//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { updateSetting } from '../../../../actions';

import Checkbox from '../common/checkbox.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Behavior(props) {
  return (
    <div>
      <h4>Main window</h4>
      <div className="paragraph">
        <Checkbox
          text="Close main window before capture"
          checked={props.settings['close-before-capture']}
          onCheck={(event, isChecked) => {
            viewDispatch(updateSetting('close-before-capture', isChecked));
          }}
        />
        <br />
        <Checkbox
          text="Open main window after capture"
          checked={props.settings['open-after-capture']}
          onCheck={(event, isChecked) => {
            viewDispatch(updateSetting('open-after-capture', isChecked));
          }}
        />
        <br />
        <Checkbox
          text="Minimize app to tray when closing main window"
          checked={props.settings['tray-on-close']}
          onCheck={(event, isChecked) => {
            viewDispatch(updateSetting('tray-on-close', isChecked));
          }}
        />
        <br />
        <Checkbox
          text="Show main window on app start"
          checked={props.settings['show-on-start']}
          onCheck={(event, isChecked) => {
            viewDispatch(updateSetting('show-on-start', isChecked));
          }}
        />
      </div>
      <div className="hr"></div>
      <h4>Upload</h4>
      <div className="paragraph">
        <Checkbox
          text="Upload after capture"
          checked={props.settings['upload-after-capture']}
          onCheck={(event, isChecked) => {
            viewDispatch(updateSetting('upload-after-capture', isChecked));
          }}
        />
      </div>
    </div>
  );
}
