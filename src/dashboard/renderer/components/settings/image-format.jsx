//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { updateSetting } from '../../../../actions';
import debounce from '../../../../utils/debounce';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function ImageFormat(props) {
  const formats = props.metadata.imageFormats;
  if (!(formats && formats.length)) {
    return null;
  }

  return (
    <div>
      <SelectField
        value={props.settings['image-format']}
        onChange={(event, index, value) => {
          viewDispatch(updateSetting('image-format', value));
        }}
        style={{
          width: '60px',
        }}
      >
        {formats.map((format) =>
          <MenuItem
            key={format.id}
            value={format.id}
            primaryText={format.name}
          />
        )}
      </SelectField>
      {(() => {
        if (props.settings['image-format'] === 'jpg') {
          return (
            <div className="form-group">
              Quality
              <Slider
                min={0}
                max={100}
                step={1}
                value={props.settings['jpg-quality']}
                onChange={debounce((event, value) => {
                  viewDispatch(updateSetting('jpg-quality', value));
                }, 200)}
                style={{
                  width: 200,
                }}
              />
            </div>
          );
        }
        return null;
      })()}
    </div>
  );
}
