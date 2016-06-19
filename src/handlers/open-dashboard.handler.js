//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function openDashboardHandler(dashboardWindow) {
  return function openDashboard() {
    dashboardWindow.open();
  };
}

openDashboardHandler.inject = ['dashboardWindow'];
