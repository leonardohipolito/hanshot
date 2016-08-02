//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as Redux from 'redux';

import alertsReducer from './alerts.reducer';
import displaysReducer from './displays.reducer';
import imageReducer from './image.reducer';
import metadataReducer from './metadata.reducer';
import settingsReducer from './settings.reducer';
import dashboardReducer from './dashboard.reducer';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default Redux.combineReducers({
  alerts: alertsReducer,
  // displays: displaysReducer,
  image: imageReducer,
  metadata: metadataReducer,
  settings: settingsReducer,
  dashboard: dashboardReducer,
});
