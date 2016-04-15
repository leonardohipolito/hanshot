'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var Redux = require('redux');
var ReduxThunk = require('redux-thunk').default;
var _ = require('lodash');

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
    case 'UPDATE_SETTING':
      var settings = Object.assign({}, state);
      settings[action.key] = action.value;
      return settings;
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

var alertsReducer = function (state, action) {
  state = state || [];
  switch (action.type) {
    case 'SHOW_ALERT':
      var isPresent = _.find(state, { id: action.alert.id });
      if (isPresent) return state;
      return state.concat([action.alert]);
    case 'CLOSE_ALERT':
      return state.filter(function (alert) {
        return alert.id !== action.alertId;
      });
    default:
      return state;
  }
};

var metadataReducer = function (state, action) {
  state = state || {};
  switch (action.type) {
    case 'RECEIVE_METADATA':
      return action.metadata;
    default:
      return state;
  }
};

var rootReducer = Redux.combineReducers({
  displays: displaysReducer,
  windows: windowsReducer,
  settings: settingsReducer,
  uploaders: uploadersReducer,
  image: imageReducer,
  alerts: alertsReducer,
  metadata: metadataReducer
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
