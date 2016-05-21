//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as fs from 'fs';

import test from 'tape';

import createJSON from '../../src/json';

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function createDir(path) {
  try {
    fs.mkdirSync(path);
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

function removeDir(path) {
  fs.rmdirSync(path);
}

function createFile(filePath, contents) {
  fs.writeFileSync(filePath, contents);
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function removeFile(filePath) {
  fs.unlinkSync(filePath);
}

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

const tmpDir = `${__dirname}/tmp`;

test('json-rw: setup', (assert) => {
  createDir(tmpDir);
  assert.end();
});

test('json-rw: read from file to object', (assert) => {
  const filePath = `${tmpDir}/read-valid.json`;
  createFile(filePath, '{"foo":42}');
  const reader = createJSON(filePath);

  const data = reader.read();

  assert.deepEqual(data, { foo: 42 });
  assert.end();

  removeFile(filePath);
});

test('json-rw: empty object if file missing', (assert) => {
  const reader = createJSON(`${tmpDir}/read-missing.json`);

  assert.deepEqual(reader.read(), {});
  assert.end();
});

test('json-rw: empty object if invalid contents', (assert) => {
  const filePath = `${tmpDir}/read-bad.json`;
  createFile(filePath, 'badjson');
  const reader = createJSON(filePath);

  const data = reader.read();

  assert.deepEqual(data, {});
  assert.end();

  removeFile(filePath);
});

test('json-rw: write to file from object', (assert) => {
  const filePath = `${tmpDir}/write-valid.json`;
  const writer = createJSON(filePath);
  const data = { foo: 42 };

  writer.write(data);

  assert.equal(readFile(filePath), '{"foo":42}');
  assert.end();

  removeFile(filePath);
});

test('json-rw: override file on write', (assert) => {
  const filePath = `${tmpDir}/write-override.json`;
  createFile(filePath, '{"bar":10}');
  const writer = createJSON(filePath);
  const data = { foo: 42 };

  writer.write(data);

  assert.equal(readFile(filePath), '{"foo":42}');
  assert.end();

  removeFile(filePath);
});

test('json-rw: teardown', (assert) => {
  removeDir(tmpDir);
  assert.end();
});
