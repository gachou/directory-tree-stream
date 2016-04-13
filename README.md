# directory-tree-stream 

[![NPM version](https://badge.fury.io/js/directory-tree-stream.svg)](http://badge.fury.io/js/directory-tree-stream)
     [![Travis Build Status](https://travis-ci.org/gachou/directory-tree-stream.svg?branch=master)](https://travis-ci.org/gachou/directory-tree-stream)
   [![Coverage Status](https://img.shields.io/coveralls/gachou/directory-tree-stream.svg)](https://coveralls.io/r/gachou/directory-tree-stream)


> A streaming directory traverser for node 4 or greater


# Installation

```
npm install directory-tree-stream
```

 
## Usage

The following example demonstrates how to use this module:

```js
const dirTreeStream = require('directory-tree-stream')
const es = require('event-stream')

// Read tree with the directory of this script (__dirname) as root-directory
dirTreeStream(__dirname)
  // file.stat contains the fs.Stats object
  // file.path contains the path, relative to the root directory
  .pipe(es.mapSync((file) => `${file.stat.mode} ${file.path}\n`))
  .pipe(process.stdout)
```

This will generate the following output

```
16893 
16893 subdir
33204 subdir/file.txt
33204 example.js
```

##  API-reference

<a name="directoryTreeStream"></a>
### directoryTreeStream(root)
Creates an instance of stream.Readable that emits all files and directories of a
given directory tree (recursively)

**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>string</code> | the root directory |




## License

`directory-tree-stream` is published under the MIT-license. 
See [LICENSE.md](LICENSE.md) for details.

## Release-Notes
 
For release notes, see [CHANGELOG.md](CHANGELOG.md)
 
## Contributing guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md).