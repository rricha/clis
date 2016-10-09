#!/usr/bin/env babel-node

require('./helper');
const fs = require('fs').promise;
const path = require('path');

let fileCount = 0;
const rmDirs = [];

function updateFileCount(change) {
  fileCount += change;
}

function getFileCount() {
  return fileCount;
}

async function rm(fileToBeDeleted) {
  fs.stat(fileToBeDeleted, async(err, stats) => {
    if (err) console.log('Error' + err);
    if (stats && stats.isFile()) {
      updateFileCount(1);
      await fs.unlink(fileToBeDeleted, (error) => {
        if (error) {
          console.error('Error deleting file' + error);
        }
        updateFileCount(-1);
        if (getFileCount() === 0) {
          for (let i = rmDirs.length - 1; i >= 0; i--) {
            const dir = rmDirs[i];
            fs.rmdir(dir, (e) => {
              if (e) {
                console.error('Error deleting directory will attempt later ' + e);
              }
            });
          }
        }
      })
    } else if (stats && stats.isDirectory()) {
      const promise = await fs.readdir(fileToBeDeleted);
      const fileNames = await promise;

      rmDirs.push(fileToBeDeleted);
      for (const fileName of fileNames) {
        const filePath = path.join(fileToBeDeleted, fileName);
        rm(filePath);
      }
    }
  });
}

async function main() {
  await rm(process.argv[2]);
}

main();
