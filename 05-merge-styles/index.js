const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const cssArray = [];

function createBundle() {
  fs.writeFile(bundlePath, '', (err) => {
    if (err) {
      console.error('Ошибка при создании файла:', err);
      return;
    }
  });
}

function writeData(data) {
  fs.appendFile(bundlePath, data, (err) => {
    if (err) {
      console.error('Ошибка при записи в файл:', err);
      return;
    }
    console.log('данные записаны');
  });
}

function lookThroughFiles(directory) {
  fs.readdir(directory, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log('Ошибка', err);
      return;
    }
    files.forEach((file) => {
      if (err) {
        console.error('Ошибка при получении информации о файле:', err);
        return;
      }
      const filePath = path.join(directory, file.name);
      const fileExtName = path.extname(filePath);
      if (file.isFile()) {
        if (fileExtName === '.css') {
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              console.error('Ошибка чтения');
              return;
            }
            cssArray.push(data);
            const dataString = cssArray.join('\n');
            createBundle();
            writeData(dataString);
          });
        }
      }
    });
  });
}
lookThroughFiles(cssPath);
