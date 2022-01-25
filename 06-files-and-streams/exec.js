const cp = require('child_process');

cp.exec('ls', (err, data, stderr) => {
  if (err) {
    throw stderr;
  }
  console.log(data);
});
