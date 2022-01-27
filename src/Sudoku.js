'use strict';

const ALL_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let table = [],
  result = '',
  solution = '',
  input;

exports.findSimpleSolution = () => {
  result = solution = '';
  initCellsFromInput();
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

const initCellsFromInput = () => {
  table = [];
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

/**
 * Verify variants of the cell
 * if single variant is left -- it is a solution,  return it
 * if more then 1 variant -  return 0 (no solution yet)
 * if no variants -- error, return "-1"
 */
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

    if (trySolveSudoku()) {
      throw new ComplexSudokuError();
    }
  }

  function trySolveSudoku() {
    let isNotPerformedAction = true;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let isCellActionPerformed = false;
        if (table[i][j] == 0 && trySolveCell(i, j)) {
          isCellActionPerformed = true;
        }
        if (isCellActionPerformed) {
          isNotPerformedAction = false;
        }
      }
    }
    return isNotPerformedAction;
  }

  function trySolveCell(i, j) {
    let isCellActionPerformed = false;

    let solvedCell = tryFindSolvedCell(i, j);
    if (solvedCell > 0) {
      isCellActionPerformed = true;
      table[i][j] = solvedCell;
      4;
    }
    return isCellActionPerformed;
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
