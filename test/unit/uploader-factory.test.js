//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';

import * as constants from '../../src/constants';
import Settings from '../../src/settings/settings';
import uploaderFactoryProvider from '../../src/uploader-factory.provider';
import ImgurUploader from '../../src/uploaders/imgur';
import DropboxUploader from '../../src/uploaders/dropbox';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('uploader-factory: use from settings if no args', (assert) => {
  const settings = new Settings();
  settings.set('default-uploader', constants.UPLOADER_DROPBOX);
  const uploaderFactory = uploaderFactoryProvider(settings);

  const uploader = uploaderFactory();

  assert.ok(uploader instanceof DropboxUploader);
  assert.end();
});

test('uploader-factory: use default if setting is bad', (assert) => {
  const settings = new Settings();
  settings.set('default-uploader', 'bad uploader');
  const uploaderFactory = uploaderFactoryProvider(settings);

  const uploader = uploaderFactory();

  assert.ok(uploader instanceof ImgurUploader);
  assert.end();
});

test('uploader-factory: use from arg', (assert) => {
  const settings = new Settings();
  settings.set('default-uploader', constants.UPLOADER_IMGUR);
  const uploaderFactory = uploaderFactoryProvider(settings);

  const uploader = uploaderFactory(constants.UPLOADER_DROPBOX);

  assert.ok(uploader instanceof DropboxUploader);
  assert.end();
});

test('uploader-factory: use setting if arg is bad', (assert) => {
  const settings = new Settings();
  settings.set('default-uploader', constants.UPLOADER_DROPBOX);
  const uploaderFactory = uploaderFactoryProvider(settings);

  const uploader = uploaderFactory('bad uploader');

  assert.ok(uploader instanceof DropboxUploader);
  assert.end();
});

test('uploader-factory: use default if arg and setting are bad', (assert) => {
  const settings = new Settings();
  settings.set('default-uploader', 'bad uploader');
  const uploaderFactory = uploaderFactoryProvider(settings);

  const uploader = uploaderFactory('bad uploader');

  assert.ok(uploader instanceof ImgurUploader);
  assert.end();
});
