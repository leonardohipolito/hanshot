'use strict';

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
        role: 'action',
        action: {
          actionName: 'uploader-auth',
          uploaderId: id
        }
      },
      {
        title: 'Cancel',
        type: 'default',
        role: 'close'
      }
    ]
  };
};
