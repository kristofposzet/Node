const readline = require('readline');
const events = require('events');

const emitter = new events.EventEmitter();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const done = (answers) => {
  console.log(answers);
  emitter.emit('done', 'Goodbye!');
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
  return emitter;
};

module.exports = {
  collectAnswers,
};
