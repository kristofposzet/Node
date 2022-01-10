const events = require('events');

const emitter = new events.EventEmitter();

emitter.on('customEvent', (data, user) => {
  console.log(`${data}, from: ${user}`);
});

process.stdin.on('data', (data) => {
  const inputData = data.toString().trim();
  if (inputData === 'exit') {
    emitter.emit('customEvent', 'Goodbye!', 'process');
    process.exit();
  }
  emitter.emit('customEvent', inputData, 'terminal');
});
