#!/usr/bin/env babel-node

require('./helper');
const fs = require('fs');

const dirName = process.argv[2].split('/');
let dir;
let path = '';

function mkdir() {
  for (let i = 0; i < dirName.length; i++) {
    dir = dirName[i];
    if (dir === '.') {
      path = dir;
      continue;
    }
    path += (i !== 0 ? '/' : '') + dir;
    fs.mkdir(path, (err) => {
      if (err) throw err;
    });
  }
}

mkdir();
