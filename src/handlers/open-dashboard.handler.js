//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function openDashboardHandler(dashboardWindow) {
  return function openDashboard() {
    dashboardWindow.show();
  };
}

openDashboardHandler.inject = ['dashboardWindow'];
