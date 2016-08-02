//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { closeAlert } from '../../../../actions';

import Alert from './alert.jsx';
import FlatButton from 'material-ui/FlatButton';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function AlertArea(props) {
  return (
    <div className="error-container">
      {props.alerts.map((alert) =>
        <Alert
          key={alert.id}
          message={alert.message}
        >
          {(alert.buttons || []).map((button) =>
            [
              <FlatButton
                label={button.title}
                secondary
                onClick={() => {
                  if (button.role === 'appAction') {
                    viewDispatch(button.appAction);
                  }
                  viewDispatch(closeAlert(alert.id));
                }}
              />,
              ' ',
            ]
          )}
        </Alert>
      )}
    </div>
  );
}

AlertArea.defaultProps = {
  alerts: [],
};
