/*!
 * directory-tree-stream <https://github.com/gachou/directory-tree-stream>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */

'use strict'

module.exports = directoryTreeStream
/**
 * Creates an instance of stream.Readable that emits all files and directories of a
 * given directory tree (recursively)
 *
 * @param {string} root the root directory
 * @public
 */
function directoryTreeStream (root) {
  return new DirTreeStream(root)
}

const Readable = require('stream').Readable
const util = require('util')
const fs = require('fs')
const path = require('path')

util.inherits(DirTreeStream, Readable)

function DirTreeStream (root) {
  Readable.call(this, {
    objectMode: true
  })
  // Directories and files to be processed
  this._root = root
  this._stack = [root]
}

// Implement _read-method from stream.Readable
DirTreeStream.prototype._read = function () {
  if (this._stack.length === 0) {
    // We are done
    this.push(null)
  }
  var next = this._stack.pop()
  // Is there an item?
  if (next) {
    fs.stat(next, (err, stat) => {
      if (err) {
        return this.emit('error', err)
      }
      if (stat.isDirectory()) {
        // Add directory to stack
        fs.readdir(next, (err, files) => {
          if (err) {
            return this.emit('error', err)
          }
          files.forEach((file) => this._stack.push(path.join(next, file)))
          // Push to stream after filling the queue with the diretory contents
          this.push({
            path: path.relative(this._root, next),
            stat: stat
          })
        })
      } else {
        // Push to stream (files, links etc)
        this.push({
          path: path.relative(this._root, next),
          stat: stat
        })
      }
    })
  }
}
