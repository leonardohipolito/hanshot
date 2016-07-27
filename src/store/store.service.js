//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as Redux from 'redux';

import appReducer from './reducers/app.reducer';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function storeService() {
  const store = Redux.createStore(appReducer);
  return store;
}
