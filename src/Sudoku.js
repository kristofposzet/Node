'use strict';

const ALL_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let table = [],
  result = '',
  solution = '',
  input,
  noTableAction = true;

exports.findSimpleSolution = () => {
  result = solution = '';
  initTableCellsFromInput();
  findSolutionOfTable();
};

const findSolutionOfTable = () => {
  try {
    tryFindSImpleSolution();
    setSolution();
    result = 'We did it ! Congratulations !\n' + 'Simple!\n';
  } catch (err) {
    if (err instanceof NoVariantsError) {
      result = 'ERROR: input is not a sudoku\n';
    } else if (err instanceof ComplexSudokuError) {
      result = 'Too complex sudoku error';
    } else {
      throw err;
    }
  }
};

const initTableCellsFromInput = () => {
  const rows = input.split('\n');

  for (let i = 0; i < 9; i++) {
    table[i] = [];

    for (let j = 0; j < 9; j++) {
      const c = rows[i][j];

      if (c === ' ') {
        table[i][j] = 0;
      } else if (+c <= 9 && +c >= 0) {
        table[i][j] = +c;
      } else {
        throw 'Wrong input format';
      }
    }
  }
};

const tryFindSolvedCell = (str, col) => {
  let variants = [...ALL_DIGITS];
  const variantsToExclude = [
    ...getSolvedByRow(col),
    ...getSolvedByColumn(str),
    ...getSolvedBySector(str, col),
  ];

  variants = variants.filter((variant) => !variantsToExclude.includes(variant));

  if (variants.length > 1) {
    return 0;
  }
  if (variants.length === 0) {
    throw new NoVariantsError();
  }
  return variants[0];
};

const getSolvedBySector = (str, col) => {
  let mini, maxi, minj, maxj;
  let variants = [];

  if (str <= 2) {
    mini = 0;
    maxi = 2;
  } else if (str <= 5) {
    mini = 3;
    maxi = 5;
  } else {
    mini = 6;
    maxi = 8;
  }
  if (col <= 2) {
    minj = 0;
    maxj = 2;
  } else if (col <= 5) {
    minj = 3;
    maxj = 5;
  } else {
    minj = 6;
    maxj = 8;
  }

  for (let i = mini; i <= maxi; i++) {
    for (let j = minj; j <= maxj; j++) {
      if (table[i][j] !== 0) {
        variants.push(table[i][j]);
      }
    }
  }
  return variants;
};

const getSolvedByColumn = (str) => {
  let variants = [];
  for (let j = 0; j < 9; j++) {
    if (table[str][j] !== 0) {
      variants.push(table[str][j]);
    }
  }
  return variants;
};

const getSolvedByRow = (col) => {
  let variants = [];
  for (let i = 0; i < 9; i++) {
    if (table[i][col] !== 0) {
      variants.push(table[i][col]);
    }
  }
  return variants;
};

const setSolution = () => {
  let s = '';
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      s += table[i][j];
    }
    s += '\n';
  }
  solution = s;
};

const tryFindSImpleSolution = () => {
  for (;;) {
    if (isSolved()) {
      return;
    }

    trySolveSudoku();
    if (noTableAction) {
      throw new ComplexSudokuError();
    }
  }

  function trySolveSudoku() {
    noTableAction = true;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (table[i][j] === 0) {
          trySolveCell(i, j);
        }
      }
    }
  }

  function trySolveCell(i, j) {
    let solvedCell = tryFindSolvedCell(i, j);
    if (solvedCell > 0) {
      noTableAction = false;
      table[i][j] = solvedCell;
    }
  }
};

const isSolved = () => {
  let isSolved = true;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (table[i][j] === 0) {
        isSolved = false;
      }
    }
  }
  return isSolved;
};

exports.setInput = (value) => {
  input = value;
};

exports.getResult = () => result;
exports.getSolution = () => solution;

class NoVariantsError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ComplexSudokuError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
