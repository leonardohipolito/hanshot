//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as actions from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function trayMenuFactory(dispatch) {
  return [
    {
      label: 'Open',
      click() {
        dispatch(actions.openDashboard());
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Desktop',
      click() {
        dispatch(actions.captureDesktop());
      },
    },
    {
      label: 'Selection',
      click() {
        dispatch(actions.captureSelection());
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Settings',
      click() {
        dispatch(actions.openSettings());
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Quit',
      click() {
        dispatch(actions.quitApp());
      },
    },
  ];
}

trayMenuFactory.inject = ['dispatch'];
