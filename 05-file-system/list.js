const fs = require('fs');

const readSync = () => {
  const files = fs.readdirSync('./assets');
  console.log('The files (sync way): ', files);
};
readSync();

const readAsync = async () => {
  try {
    const files = await fs.promises.readdir('./assets');
    console.log('The files (async way): ', files);
  } catch (err) {
    throw err;
  }
};
readAsync();
