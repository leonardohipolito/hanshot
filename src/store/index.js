'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var Redux = require('redux');
var ReduxThunk = require('redux-thunk').default;

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

var displaysReducer = function (state, action) {
  state = state || [];
  switch (action.type) {
    case 'DISPLAYS_RECEIVED':
      return action.displays;
    default:
      return state;
  }
};

var windowsReducer = function (state, action) {
  state = state || [];
  switch (action.type) {
    case 'WINDOWS_RECEIVED':
      return action.windows;
    default:
      return state;
  }
};

var settingsReducer = function (state, action) {
  state = state || {};
  switch (action.type) {
    case 'SETTINGS_RECEIVED':
      return action.settings;
    default:
      return state;
  }
};

var uploadersReducer = function (state, action) {
  state = state || [];
  switch (action.type) {
    case 'UPLOADERS_RECEIVED':
      return action.uploaders;
    default:
      return state;
  }
};

var imageReducer = function (state, action) {
  state = state || null;
  switch (action.type) {
    case 'IMAGE_RECEIVED':
      return action.image;
    default:
      return state;
  }
};

var rootReducer = Redux.combineReducers({
  displays: displaysReducer,
  windows: windowsReducer,
  settings: settingsReducer,
  uploaders: uploadersReducer,
  image: imageReducer
});

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function createStore() {

  var store = Redux.createStore(
    rootReducer,
    Redux.applyMiddleware(ReduxThunk)
  );

  return store;
};
