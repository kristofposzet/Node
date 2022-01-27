const { Sudoku, setInput, findSimpleSolution, getResult, getSolution } = require('./Sudoku');
setInput(
  '2  5  8 3\n' +
    '  6      \n' +
    '51   2 49\n' +
    '46    9 5\n' +
    '   1 3   \n' +
    ' 21     7\n' +
    ' 3 4   62\n' +
    '   3  5  \n' +
    '6 7  8  4'
);
findSimpleSolution();
console.log(getResult());
console.log(getSolution());
