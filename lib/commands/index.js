"use strict";

module.exports = function() {

  var fs = require('fs')
    , results = []

  fs.readdirSync('./lib/commands').forEach(function(filename) {
    console.log('FILE', filename)
    if (filename === 'index.js') {
      return false
    }
    if (!filename.match(/\.js$/)) {
      return false
    }
    results.push(require('./' + filename))
  })

  return results
}