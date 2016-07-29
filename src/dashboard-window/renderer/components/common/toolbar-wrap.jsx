import React from 'react';

export default function ToolbarWrap(props) {
  return (
    <div
      style={{ position: 'relative', margin: '10px 3px' }}
    >
      {props.children}
    </div>
  );
}
