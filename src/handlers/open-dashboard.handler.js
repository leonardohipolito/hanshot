//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function handlerFactory(dashboardWindow) {
  return function openDashboard() {
    dashboardWindow.open();
  };
}

handlerFactory.inject = ['dashboardWindow'];
