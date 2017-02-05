//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '~/dashboard/renderer/view-dispatch.js';
import { updateSetting } from '~/actions';

import { Select, Option } from '../common/select.jsx';
import Range from '../common/range.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function ImageFormat(props) {
  const formats = props.metadata.imageFormats;
  if (!(formats && formats.length)) {
    return null;
  }

  let options = null;
  if (props.settings['image-format'] === 'jpg') {
    options = (
      <div>
        <h4>Quality</h4>
        <div className="paragraph">
          <Range
            min={0}
            max={100}
            step={10}
            value={props.settings['jpg-quality']}
            onChange={(value) => {
              viewDispatch(updateSetting('jpg-quality', value));
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4>Format</h4>
      <div className="paragraph">
        <Select
          value={props.settings['image-format']}
          onChange={(event, value) => {
            viewDispatch(updateSetting('image-format', value));
          }}
        >
          {formats.map((format) =>
            <Option
              key={format.id}
              value={format.id}
              text={format.name}
            />
          )}
        </Select>
      </div>
      {options}
    </div>
  );
}

ImageFormat.propTypes = {
  settings: React.PropTypes.object,
  metadata: React.PropTypes.object,
};
