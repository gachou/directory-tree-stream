const dirTreeStream = require('../')
const es = require('event-stream')

// Read tree with the directory of this script (__dirname) as root-directory
dirTreeStream(__dirname)
  // file.stat contains the fs.Stats object
  // file.path contains the path, relative to the root directory
  .pipe(es.mapSync((file) => `${file.stat.mode} ${file.path}\n`))
  .pipe(process.stdout)
