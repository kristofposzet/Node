/* TASK:
  1. create a folder
  2. create a file inside of it and write some content within the file
  3. append some content
  4. rename the file after 5 seconds
  5. delete the folder after 10 seconds (you have to delete all the files inside too)
*/

const fs = require('fs');
const CMD_KEYS = ['--dirName', '--fileName'];

// HELPERS - get the value of the keys from CMD
const grabValueFromCMD = (key) => {
  // --dirName directory ==> directory is next to --dirName
  const index = process.argv.indexOf(key);
  return process.argv[index + 1];
};

const grabValuesFromCMD = () => {
  return CMD_KEYS.map((key) => grabValueFromCMD(key));
};
const [dirName, fileName] = grabValuesFromCMD();
const fileData = "Hello world, i'm a file data!";

// ACTUALLY THE FILE OPERATIONS
const createFolder = async (folderName) => {
  if (!fs.existsSync(folderName)) {
    try {
      return await fs.promises.mkdir(folderName);
    } catch (err) {
      throw err;
    }
  }
};
const createFile = async (fileName, fileData) => {
  if (!fs.existsSync(fileName)) {
    try {
      return await fs.promises.writeFile(fileName, fileData);
    } catch (err) {
      throw err;
    }
  }
};

const appendContent = async (fileName, fileData) => {
  try {
    return await fs.promises.appendFile(fileName, fileData);
  } catch (err) {
    throw err;
  }
};

const renameFile = async (oldName, newName) => {
  try {
    setTimeout(async () => {
      await fs.promises.rename(oldName, newName);
    }, 5000);
  } catch (err) {
    throw err;
  }
};

const deleteFolder = async (folderName) => {
  setTimeout(async () => {
    try {
      const fileNames = await fs.promises.readdir(folderName);
      fileNames.forEach(async (file) => await fs.promises.unlink(`${folderName}/${file}`));
      await fs.promises.rmdir(folderName);
    } catch (err) {
      throw err;
    }
  }, 10000);
};

const main = async () => {
  await createFolder(dirName);
  await createFile(`${dirName}/${fileName}`, fileData);
  await appendContent(`${dirName}/${fileName}`, fileData);
  await renameFile(`${dirName}/${fileName}`, `${dirName}/randomCucc`);
  await deleteFolder(dirName);
};

main();
