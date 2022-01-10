const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const done = (answers) => {
  console.log(answers);
  process.exit();
};

const collectAnswers = (questions) => {
  const answers = [];

  const askQuestion = (index) => {
    rl.question(questions[index], (answer) => {
      answers.push(answer);
      if (answers.length < questions.length) {
        askQuestion(index + 1);
      } else {
        done(answers);
      }
    });
  };

  askQuestion(0);
};

// THIS WORKS TOO! Another recursive way.
const collectAnswers_variant2 = (questions) => {
  const answers = [];
  const [first] = questions;

  const questionAnswered = (answer) => {
    answers.push(answer);
    if (answers.length < questions.length) {
      rl.question(questions[answers.length], questionAnswered);
    } else {
      done(answers);
    }
  };

  rl.question(first, questionAnswered);
};

module.exports = {
  collectAnswers,
  collectAnswers_variant2,
};
