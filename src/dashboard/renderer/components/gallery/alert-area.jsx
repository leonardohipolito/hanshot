//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '~/dashboard/renderer/view-dispatch.js';
import { closeAlert } from '~/actions';

import Alert from '../common/alert.jsx';
import Button from '../common/button.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function AlertArea(props) {
  return (
    <div>
      {props.alerts.map((alert) =>
        <Alert
          key={alert.id}
          message={alert.message}
        >
          {(alert.buttons || []).map((button) =>
            [
              <Button
                onClick={() => {
                  if (button.role === 'appAction') {
                    viewDispatch(button.appAction);
                  }
                  viewDispatch(closeAlert(alert.id));
                }}
              >
                {button.title}
              </Button>,
              ' ',
            ]
          )}
        </Alert>
      )}
    </div>
  );
}

AlertArea.propTypes = {
  alerts: React.PropTypes.array,
};

AlertArea.defaultProps = {
  alerts: [],
};
