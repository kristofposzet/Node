const fs = require('fs');
const { resolve } = require('path');
const fileName = resolve(__dirname, './dummy.txt');

// ------------- FOLDER --------------
const createFolder = (folderName) => {
  fs.access(folderName, (err) => {
    // ha err, azt jelenti: nincs még folder
    if (err) {
      fs.mkdir(folderName, (err) => {
        if (err) {
          console.log('Error creating the folder: ', err.message);
          return;
        }
        console.log('Folder created.');
      });
    }
  });
};

const removeFolder = async (folderName) => {
  try {
    await fs.promises.rmdir(folderName);
  } catch (err) {
    console.log(err.message);
  }
};

createFolder('karcsi');
setTimeout(() => removeFolder('karcsi'), 5000);

// --------------- FILE --------------
