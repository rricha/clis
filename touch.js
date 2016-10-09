#!/usr/bin/env babel-node

require('./helper')
const fs = require('fs')


function touch() {
  fs.open(process.argv[2], 'r', (err, fd) => {
    if (err) throw err;
    fs.futimes(fd, new Date(), new Date(), (error) => {
      if (error) throw error;
    })
  })
}

touch()
