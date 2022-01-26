const fs = require('fs');
const { resolve } = require('path');
fs.open(resolve(__dirname, './dummy.txt'), 'r', (err, fd) => {
  console.log(`This is the file descriptor: ${fd}`);
});
