//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { updateSetting, showDialogToPickSaveDir } from '../../../../actions';

import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Save(props) {
  return (
    <div className="paragraph">
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
        <div className="paragraph"
          style={{
            color: '#a2a2a2',
            borderBottom: '1px solid #e8e8e8',
            margin: '20px 0 0 0',
          }}
        >
          {props.settings['save-dir-path']}
        </div>
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
  );
}
