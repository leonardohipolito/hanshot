//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';

import { fromDataURL, toDataURL } from '../../src/buffer';

import JPG_BASE64 from './helpers/jpg-base64';
import PNG_BASE64 from './helpers/png-base64';

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

// Basically, image byte stream has leading bytes which act like a
// signature for image format

// https://en.wikipedia.org/wiki/JPEG#Syntax_and_structure
const JPG_SIGN = ['ff', 'd8', 'ff'];
// https://en.wikipedia.org/wiki/Portable_Network_Graphics#File_header
const PNG_SIGN = ['89', '50', '4e', '47'];

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('buffer: convert jpeg data url to jpeg buffer', (assert) => {
  const dataURL = `data:image/jpeg;base64,${JPG_BASE64}`;

  const buffer = fromDataURL(dataURL);

  assert.ok(Buffer.isBuffer(buffer), 'is buffer');
  assert.ok(Buffer.isEncoding('binary'), 'is binary encoding');
  assert.equal(buffer[0].toString(16), JPG_SIGN[0], 'match first byte');
  assert.equal(buffer[1].toString(16), JPG_SIGN[1], 'match second byte');
  assert.equal(buffer[2].toString(16), JPG_SIGN[2], 'match third byte');
  assert.end();
});

test('buffer: convert png data url to png buffer', (assert) => {
  const dataURL = `data:image/png;base64,${PNG_BASE64}`;

  const buffer = fromDataURL(dataURL);

  assert.ok(Buffer.isBuffer(buffer), 'is buffer');
  assert.ok(Buffer.isEncoding('binary'), 'is binary encoding');
  assert.equal(buffer[0].toString(16), PNG_SIGN[0], 'match first byte');
  assert.equal(buffer[1].toString(16), PNG_SIGN[1], 'match second byte');
  assert.equal(buffer[2].toString(16), PNG_SIGN[2], 'match third byte');
  assert.equal(buffer[3].toString(16), PNG_SIGN[3], 'match fourth byte');
  assert.end();
});

test('buffer: convert jpeg buffer to png data url', (assert) => {
  const buffer = Buffer.from(JPG_BASE64, 'base64');

  const dataURL = toDataURL(buffer);

  assert.equal(dataURL.indexOf('data:image/png;base64,'), 0, 'start as data url');
  assert.end();
});

test('buffer: convert png buffer to png data url', (assert) => {
  const buffer = Buffer.from(PNG_BASE64, 'base64');

  const dataURL = toDataURL(buffer);

  assert.equal(dataURL.indexOf('data:image/png;base64,'), 0, 'start as data url');
  assert.end();
});
