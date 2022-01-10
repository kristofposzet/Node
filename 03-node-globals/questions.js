const questions = [
  'What do you do?',
  'What is your name?',
  'What would you rather be doing?',
  'What kind of music do you prefer?',
];

const ask = (i = 0) => {
  process.stdout.write(`\n\n${questions[i]}`);
  process.stdout.write(' > ');
};

const answers = [];
const answer = () => {
  process.stdin.on('data', (dataFromInput) => {
    answers.push(dataFromInput.toString().trim());
    if (answers.length < questions.length) {
      ask(answers.length);
    } else {
      process.exit();
    }
  });
};

ask();
answer();

process.on('exit', () => {
  const [, name, activity, music] = answers;
  console.log(`
  
  ${name}, thank you for your answers!
  Relax, instead of doing ${activity}, listen to ${music}! :D
  
  `);
});
