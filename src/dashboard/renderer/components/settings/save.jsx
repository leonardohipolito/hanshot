//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { updateSetting, showDialogToPickSaveDir } from '../../../../actions';

import Checkbox from '../common/checkbox.jsx';
import Button from '../common/button.jsx';
import DisabledArea from '../common/disabled-area.jsx';

import './save.css';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Save(props) {
  return (
    <div className="paragraph save">
      <Checkbox
        text="Auto save to directory"
        checked={props.settings['save-dir-selected']}
        onChange={(event, value) => {
          viewDispatch(updateSetting('save-dir-selected', value));
        }}
      />
      <DisabledArea active={!props.settings['save-dir-selected']}>
        <div className="directory-path">
          {props.settings['save-dir-path']}
        </div>
        <br />
        <Button
          onClick={() => {
            viewDispatch(showDialogToPickSaveDir());
          }}
        >
          Change
        </Button>
      </DisabledArea>
    </div>
  );
}

Save.propTypes = {
  settings: React.PropTypes.object,
};
