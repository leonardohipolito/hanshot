//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { updateSetting, showDialogToPickSaveDir } from '../../../../actions';

import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Save(props) {
  return (
    <div>
      <div className="form-group">
        <Checkbox
          label="Auto save to directory"
          checked={props.settings['save-dir-selected']}
          onCheck={(event, value) => {
            viewDispatch(updateSetting('save-dir-selected', value));
          }}
        />
        <div
          className={props.settings['save-dir-selected'] ? '' : 'disabled-area'}
        >
          <TextField
            disabled
            hintText={props.settings['save-dir-path']}
            name="save-path-dir"
          />
          <br />
          <RaisedButton
            disabled={!props.settings['save-dir-selected']}
            onClick={() => {
              viewDispatch(showDialogToPickSaveDir());
            }}
          >
            Change
          </RaisedButton>
        </div>
      </div>
    </div>
  );
}
