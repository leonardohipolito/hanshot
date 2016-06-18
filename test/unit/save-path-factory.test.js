//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';
import { useFakeTimers } from 'sinon';

import * as constants from '../../src/constants';
import Settings from '../../src/settings';
import savePathFactoryProvider from '../../src/save-path-factory.provider';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('save-path-factory: unsaved path', (assert) => {
  const date = new Date(2001, 8, 11, 20, 46, 5);
  const clock = useFakeTimers(date.getTime());
  const settings = new Settings();
  settings.set('image-format', constants.IMAGE_FORMAT_JPG);
  const config = {
    UNSAVED_PATH: '/path/to/unsaved',
  };
  const savePathFactory = savePathFactoryProvider(config, settings);

  const savePath = savePathFactory(constants.IMAGE_SOURCE_CLIPBOARD);
  const expectedPath = '/path/to/unsaved/clipboard_2001-9-11-20-46-5.jpg';

  clock.restore();
  assert.equal(savePath, expectedPath, 'paths match');
  assert.end();
});

test('save-path-factory: user path', (assert) => {
  const date = new Date(2001, 8, 11, 20, 46, 5);
  const clock = useFakeTimers(date.getTime());
  const settings = new Settings();
  settings.set('image-format', constants.IMAGE_FORMAT_PNG);
  settings.set('save-dir-selected', true);
  settings.set('save-dir-path', '/path/to/user');
  const config = {
    UNSAVED_PATH: '/path/to/unsaved',
  };
  const savePathFactory = savePathFactoryProvider(config, settings);

  const savePath = savePathFactory(constants.IMAGE_SOURCE_DESKTOP);
  const expectedPath = '/path/to/user/desktop_2001-9-11-20-46-5.png';

  clock.restore();
  assert.equal(savePath, expectedPath, 'paths match');
  assert.end();
});

test('save-path-factory: image sources', (assert) => {
  const date = new Date(2001, 8, 11, 20, 46, 5);
  const clock = useFakeTimers(date.getTime());
  const settings = new Settings();
  settings.set('image-format', constants.IMAGE_FORMAT_PNG);
  const config = {
    UNSAVED_PATH: '/path/to/unsaved',
  };
  const savePathFactory = savePathFactoryProvider(config, settings);

  assert.equal(
    savePathFactory(constants.IMAGE_SOURCE_CLIPBOARD),
    '/path/to/unsaved/clipboard_2001-9-11-20-46-5.png',
    'match clipboard source'
  );
  assert.equal(
    savePathFactory(constants.IMAGE_SOURCE_DESKTOP),
    '/path/to/unsaved/desktop_2001-9-11-20-46-5.png',
    'match desktop source'
  );
  assert.equal(
    savePathFactory(constants.IMAGE_SOURCE_SELECTION),
    '/path/to/unsaved/selection_2001-9-11-20-46-5.png',
    'match selection source'
  );
  assert.equal(
    savePathFactory('some bad source'),
    '/path/to/unsaved/screenshot_2001-9-11-20-46-5.png',
    'match unknown source'
  );
  clock.restore();
  assert.end();
});

test('save-path-factory: default image format', (assert) => {
  const date = new Date(2001, 8, 11, 20, 46, 5);
  const clock = useFakeTimers(date.getTime());
  const settings = new Settings();
  settings.set('image-format', 'some bad format');
  const config = {
    UNSAVED_PATH: '/path/to/unsaved',
  };
  const savePathFactory = savePathFactoryProvider(config, settings);

  const savePath = savePathFactory(constants.IMAGE_SOURCE_DESKTOP);
  const expectedPath = '/path/to/unsaved/desktop_2001-9-11-20-46-5.jpg';

  clock.restore();
  assert.equal(savePath, expectedPath, 'paths match');
  assert.end();
});
