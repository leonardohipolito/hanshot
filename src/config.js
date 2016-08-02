//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as path from 'path';

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

const rootPath = path.resolve(__dirname, '..');
const sourcePath = path.join(rootPath, 'src');
const resourcesPath = path.join(rootPath, 'resources');
const appDataPath = path.join(electron.app.getPath('appData'), 'hanshot');

export const SOURCE_PATH = sourcePath;
export const CACHE_PATH = path.join(appDataPath, 'cache.json');
export const SETTINGS_PATH = path.join(appDataPath, 'settings.json');
export const UNSAVED_PATH = path.join(appDataPath, 'unsaved');
export const DEFAULT_SETTINGS_PATH = path.join(
  sourcePath, 'settings', 'default.json'
);
export const TRAY_ICON_PATH = path.join(resourcesPath, 'tray.png');
export const USER_HOME_PATH = electron.app.getPath('home');
export const USER_PICTURES_PATH = electron.app.getPath('pictures');
