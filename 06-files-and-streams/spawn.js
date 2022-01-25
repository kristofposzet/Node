const cp = require('child_process');

const questionApp = cp.spawn('node', ['../04-node-modules/questions.js']);

questionApp.stdout.on('data', (data) => {
  console.log(`From questionApp: ${data}`);
});
