'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var appActions = require('../actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

exports.uploaderAuth = function (id, title) {
  return {
    id: 'ALERT_UPLOADER_AUTH_' + id.toUpperCase(),
    type: 'danger',
    message: title + ' requires authorization.',
    buttons: [
      {
        title: 'Authorize',
        type: 'danger',
        role: 'appAction',
        appAction: appActions.authorizeUploader(id)
      },
      {
        title: 'Cancel',
        type: 'default',
        role: 'close'
      }
    ]
  };
};
