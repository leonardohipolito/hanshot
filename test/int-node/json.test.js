//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as fs from 'fs';

import test from 'tape';

import JSONSource from '../../src/json.source';

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
  const reader = new JSONSource(filePath);

  const data = reader.read();

  assert.deepEqual(data, { foo: 42 });
  assert.end();

  removeFile(filePath);
});

test('json-rw: throw if file missing', (assert) => {
  const reader = new JSONSource(`${tmpDir}/read-missing.json`);
  const fn = function fn() {
    reader.read();
  };

  assert.throws(fn);
  assert.end();
});

test('json-rw: throw if invalid contents', (assert) => {
  const filePath = `${tmpDir}/read-bad.json`;
  createFile(filePath, 'badjson');
  const reader = new JSONSource(filePath);
  const fn = function fn() {
    reader.read();
  };


  assert.throws(fn);
  assert.end();

  removeFile(filePath);
});

test('json-rw: write to file from object', (assert) => {
  const filePath = `${tmpDir}/write-valid.json`;
  const writer = new JSONSource(filePath);
  const data = { foo: 42 };

  writer.write(data);

  assert.equal(readFile(filePath), '{"foo":42}');
  assert.end();

  removeFile(filePath);
});

test('json-rw: override file on write', (assert) => {
  const filePath = `${tmpDir}/write-override.json`;
  createFile(filePath, '{"bar":10}');
  const writer = new JSONSource(filePath);
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
