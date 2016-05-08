//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as path from 'path';

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

const dataPath = electron.app.getPath('appData');

const config = {
  CACHE_PATH: path.join(dataPath, 'hanshot', 'cache.json'),
  SETTINGS_PATH: path.join(dataPath, 'hanshot', 'settings.json'),
};

export default config;
