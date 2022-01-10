// const { collectAnswers } = require('./moduleCollectAnswers');
const { collectAnswers } = require('./moduleCollectAnsWithEvents');

const questions = [
  'What is your name?',
  'How old you are?',
  'What are you going to do with Node.js?',
];

const answers = collectAnswers(questions);
answers.on('done', (finalAnswer) => {
  console.log(`DONE, final answer emitted: ${finalAnswer}`);
});
