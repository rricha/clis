#!/usr/bin/env babel-node

require('./helper')

function echo() {
  process.stdout.write(process.argv[2] + '\n')
}

echo()
