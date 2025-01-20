const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

const copiedFiles = path.join(__dirname, 'files');
const destination = path.join(__dirname, 'file-copy');

async function createDir() {
  try {
    await fsPromises.mkdir(destination, { recursive: true });
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log('Директория уже существует.');
    } else {
      console.error('Произошла ошибка при создании директории:', err);
    }
  }
}

async function copyFile(sourcePath, destPath) {
  try {
    await fsPromises.copyFile(sourcePath, destPath, fs.constants.COPYFILE_EXCL);
    console.log(`${sourcePath} скопирован в ${destPath}`);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(`Файл уже существует: ${destPath}`);
    } else {
      console.error('Ошибка при копировании файла:', err);
    }
  }
}

async function main() {
  await createDir();

  try {
    const files = await fsPromises.readdir(copiedFiles, {
      withFileTypes: true,
    });

    for (const file of files) {
      if (file.isFile()) {
        const sourcePath = path.join(copiedFiles, file.name);
        const destPath = path.join(destination, file.name);
        await copyFile(sourcePath, destPath);
      }
    }
  } catch (err) {
    console.error('Ошибка при чтении директории:', err);
  }
}

main();
