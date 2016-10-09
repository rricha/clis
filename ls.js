#!/usr/bin/env babel-node

require('./helper')
const fs = require('fs').promise
const path = require('path')

async function ls(origPath, rootPath, isRecursive) {
  const promise = await fs.readdir(rootPath);
  const fileNames = await promise
  for (const fileName of fileNames) {
    const filePath = path.join(rootPath, fileName);
    fs.stat(filePath, (err, stats) => {
      try {
        if (stats && stats.isFile()) {
          process.stdout.write((origPath !== rootPath ? filePath : fileName) + '\n');
        } else if (stats && stats.isDirectory() && isRecursive) {
          ls(origPath, filePath, isRecursive);
        }
      } catch (e) {
        console.log('error');
      }
    });
  }
}
async function main() {
  let dir
  let recursive
  if (process.argv.length > 2) {
    dir = process.argv[2];
  }
  if (process.argv.length > 3) {
    recursive = process.argv[3];
  }
  const isRecursive = recursive && recursive === '-R';
  await ls(dir || __dirname, dir || __dirname, isRecursive);
}
main()
