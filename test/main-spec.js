/*!
 * directory-tree-stream <https://github.com/gachou/directory-tree-stream>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */
'use strict'

/* global describe */
/* global it */
// /* global xdescribe */
// /* global xit */

var path = require('path')
var es = require('event-stream')
var expect = require('chai').expect

var directoryTreeStream = require('../')

describe('directory-tree-stream:', function () {
  it('should traverse the whole directory-tree', (done) => {
    var basePath = path.resolve(__dirname, 'fixtures')
    directoryTreeStream(basePath)
      .pipe(es.mapSync((file) => file.path))
      .pipe(es.writeArray((err, array) => {
        if (err) {
          throw err
        }
        expect(array).to.deep.equal([
          '',
          'testdir1',
          'testdir1/subdir1',
          'testdir1/subdir1/file2.txt',
          'testdir1/file1.txt'
        ])
        done()
      }))
  })
})
