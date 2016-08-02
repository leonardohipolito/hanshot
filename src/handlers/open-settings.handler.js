//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { showDashboardSettings } from '../store/actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function openSettingsHandler(store, dashboardWindow) {
  return function openSettings() {
    store.dispatch(showDashboardSettings());
    dashboardWindow.show();
  };
}

openSettingsHandler.inject = ['store', 'dashboardWindow'];
