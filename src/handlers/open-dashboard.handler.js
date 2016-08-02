//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { showDashboardGallery } from '../store/actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function openDashboardHandler(store, dashboardWindow) {
  return function openDashboard() {
    store.dispatch(showDashboardGallery());
    dashboardWindow.show();
  };
}

openDashboardHandler.inject = ['store', 'dashboardWindow'];
