const waitTimeout = 3000;
const waitInterval = 30;
let passedTime = 0;

const stopInterval = (interval) => {
  clearInterval(interval);
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write('DONE');
};

const printEveryHalfSecond = () => {
  passedTime += waitInterval;
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`Wait... ${Math.floor((passedTime / waitTimeout) * 100)}%.`);
};

const interval = setInterval(printEveryHalfSecond, waitInterval);

setTimeout(() => stopInterval(interval), waitTimeout);
