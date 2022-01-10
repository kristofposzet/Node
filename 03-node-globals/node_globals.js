// __filename, __dirname: prints the full path
const path = require('path');
console.log(`File name: ${path.basename(__filename)}; Dir name: ${path.basename(__dirname)}`);

// PROCESS
console.log(`Process id: ${process.pid}`);
console.log(`Node version: ${process.versions.node}`);
console.log(process.argv); // first - node execution file, second: path to the current module

// ARGUMENT VARIABLES
const grabValueFromCMD = (flag) => {
  // the value is after the flag
  const indexAfterFlag = process.argv.indexOf(flag) + 1;
  return process.argv[indexAfterFlag];
};

const user = grabValueFromCMD('--user');
const age = grabValueFromCMD('--age');
console.log(`Get CMD values (marked with --user and --age flags): ${user}, ${age}`);
