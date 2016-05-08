//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as path from 'path';

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

const dataPath = electron.app.getPath('appData');

export const CACHE_PATH = path.join(dataPath, 'hanshot', 'cache.json');
export const SETTINGS_PATH = path.join(dataPath, 'hanshot', 'settings.json');
