//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as path from 'path';

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

const appDataPath = electron.app.getPath('appData');
const resourcesPath = path.resolve(__dirname, '..', 'resources');

export const CACHE_PATH = path.join(appDataPath, 'hanshot', 'cache.json');
export const SETTINGS_PATH = path.join(appDataPath, 'hanshot', 'settings.json');
export const UNSAVED_PATH = path.join(appDataPath, 'hanshot', 'unsaved');
export const TRAY_ICON_PATH = path.join(resourcesPath, 'tray.png');
export const USER_HOME_PATH = electron.app.getPath('home');
