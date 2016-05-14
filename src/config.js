//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as path from 'path';

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

const userDataPath = electron.app.getPath('appData');
const resourcesPath = path.resolve(__dirname, '..', 'resources');

export const CACHE_PATH = path.join(userDataPath, 'hanshot', 'cache.json');
export const SETTINGS_PATH = path.join(userDataPath, 'hanshot', 'settings.json');
export const TRAY_ICON_PATH = path.join(resourcesPath, 'tray.png');
export const USER_HOME_PATH = electron.app.getPath('home');
