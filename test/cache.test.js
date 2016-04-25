'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var assert = require('chai').assert;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

var fsStub = {};
var Cache;

describe('cache', function () {

  beforeEach(function () {
    fsStub = {};
    Cache = proxyquire('../src/cache', {
      fs: fsStub
    });
  });

  describe('constructor', function () {

    it('should read from file path in args', function () {
      fsStub.readFileSync = sinon.spy();
      var cache = new Cache('/some/path');
      assert.deepEqual(fsStub.readFileSync.args[0], ['/some/path', 'utf8']);
    });

    it('should not throw if file does not exist', function () {
      fsStub.readFileSync = function () { throw { code: 'ENOENT' }; };
      var initCache = function initCache() {
        var cache = new Cache('/some/path');
      };
      assert.doesNotThrow(initCache);
    });

    it('should throw any other read error', function () {
      fsStub.readFileSync = function () {
        var err = new Error(); err.code = 'SOMEERR'; throw err;
      };
      var initCache = function initCache() {
        var cache = new Cache('/some/path');
      };
      assert.throws(initCache);
    });

  });

});
