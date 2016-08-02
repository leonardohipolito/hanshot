//------------------------------------------------------------------------------
// Action types
//------------------------------------------------------------------------------

export const SHOW_ALERT = 'SHOW_ALERT';
export const CLOSE_ALERT = 'CLOSE_ALERT';
export const RECEIVE_DISPLAYS = 'RECEIVE_DISPLAYS';
export const RECEIVE_IMAGE = 'RECEIVE_IMAGE';
export const RECEIVE_METADATA = 'RECEIVE_METADATA';
export const RECEIVE_SETTINGS = 'RECEIVE_SETTINGS';
export const UPDATE_SETTING = 'UPDATE_SETTING';
export const SHOW_DASHBOARD_GALLERY = 'SHOW_DASHBOARD_GALLERY';
export const SHOW_DASHBOARD_SETTINGS = 'SHOW_DASHBOARD_SETTINGS';

//------------------------------------------------------------------------------
// Action creators
//------------------------------------------------------------------------------

export function showAlert(alert) {
  return {
    type: SHOW_ALERT,
    alert,
  };
}

export function closeAlert(alertId) {
  return {
    type: CLOSE_ALERT,
    alertId,
  };
}

export function receiveDisplays(displays) {
  return {
    type: RECEIVE_DISPLAYS,
    displays,
  };
}

export function receiveImage(image) {
  return {
    type: RECEIVE_IMAGE,
    image,
  };
}

export function receiveMetadata(metadata) {
  return {
    type: RECEIVE_METADATA,
    metadata,
  };
}

export function receiveSettings(settings) {
  return {
    type: RECEIVE_SETTINGS,
    settings,
  };
}

export function updateSetting(key, value) {
  return {
    type: UPDATE_SETTING,
    key,
    value,
  };
}

export function showDashboardGallery() {
  return {
    type: SHOW_DASHBOARD_GALLERY,
  };
}

export function showDashboardSettings() {
  return {
    type: SHOW_DASHBOARD_SETTINGS,
  };
}
