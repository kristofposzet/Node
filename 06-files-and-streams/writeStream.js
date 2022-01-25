const fs = require('fs');

const writeStream = fs.createWriteStream('./assets/out.txt', 'utf-8');
// COPY STDIN TO A FILE
process.stdin.on('data', (data) => writeStream.write(data));
process.stdin.pipe(writeStream); // this works too

// COPY A FILE CONTENT TO ANOTHER FILE
const readStream = fs.createReadStream('./assets/lorem.md', 'utf-8');
readStream.pipe(writeStream);
