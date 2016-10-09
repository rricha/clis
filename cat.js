#!/usr/bin/env babel-node

require('./helper');
const fs = require('fs');

function cat() {
  fs.readFile(process.argv[2], (err, data) => {
    if (err) throw err;
    process.stdout.write(data.toString())
  })
}

cat();
