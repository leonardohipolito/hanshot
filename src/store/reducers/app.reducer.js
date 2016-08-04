//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as Redux from 'redux';

import alertsReducer from './alerts.reducer';
import dashboardReducer from './dashboard.reducer';
import displaysReducer from './displays.reducer';
import imageReducer from './image.reducer';
import metadataReducer from './metadata.reducer';
import settingsReducer from './settings.reducer';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default Redux.combineReducers({
  alerts: alertsReducer,
  dashboard: dashboardReducer,
  displays: displaysReducer,
  image: imageReducer,
  metadata: metadataReducer,
  settings: settingsReducer,
});
