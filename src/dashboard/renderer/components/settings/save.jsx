//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { updateSetting, showDialogToPickSaveDir } from '../../../../actions';

import Checkbox from '../common/checkbox.jsx';
import Button from '../common/button.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Save(props) {
  return (
    <div className="paragraph">
      <Checkbox
        text="Auto save to directory"
        checked={props.settings['save-dir-selected']}
        onChange={(event, value) => {
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
        <Button
          disabled={!props.settings['save-dir-selected']}
          onClick={() => {
            viewDispatch(showDialogToPickSaveDir());
          }}
        >
          Change
        </Button>
      </div>
    </div>
  );
}
