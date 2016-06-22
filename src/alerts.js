//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { authorizeUploader } from './actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export function uploaderAuth(id, title) {
  return {
    id: `ALERT_UPLOADER_AUTH_${id.toUpperCase()}`,
    type: 'danger',
    message: `${title} requires authorization.`,
    buttons: [
      {
        title: 'Authorize',
        type: 'danger',
        role: 'appAction',
        appAction: authorizeUploader(id),
      },
      {
        title: 'Cancel',
        type: 'default',
        role: 'close',
      },
    ],
  };
}
