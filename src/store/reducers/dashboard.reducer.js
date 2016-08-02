//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { SHOW_DASHBOARD_GALLERY, SHOW_DASHBOARD_SETTINGS } from '../actions';
import { DASHBOARD_PAGE_GALLERY, DASHBOARD_PAGE_SETTINGS } from '../../constants';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function dashboardReducer(state = {
  activePage: DASHBOARD_PAGE_GALLERY,
}, action) {
  switch (action.type) {
    case SHOW_DASHBOARD_GALLERY:
      return Object.assign({}, state, {
        activePage: DASHBOARD_PAGE_GALLERY,
      });
    case SHOW_DASHBOARD_SETTINGS:
      return Object.assign({}, state, {
        activePage: DASHBOARD_PAGE_SETTINGS,
      });
    default:
      return state;
  }
}
