//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '../../view-dispatch';
import { closeAlert } from '../../../../actions';

import Alert from './alert.jsx';
import Button from '../common/button.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function AlertArea(props) {
  return (
    <div className="alert-area">
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
