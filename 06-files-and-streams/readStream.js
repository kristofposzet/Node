const fs = require('fs');

const readStream = fs.createReadStream('./assets/lorem.md', 'utf-8');

readStream.on('data', (data) => {
  console.log('---------------FIRST----------------\n');
  console.log(data);
});

// one-time listener
readStream.once('data', (data) => {
  console.log('\n\n---------------SECOND-----------------');
  console.log(data);
});

readStream.on('end', () => console.log('finished'));
