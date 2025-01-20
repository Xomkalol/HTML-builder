const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'secret-folder');

function lookDirectoryAndConsole(directoryPath) {
  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log('Ошибка', err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file.name);
      let filesize;
      const fileName = path.basename(filePath, path.extname(filePath));
      const fileExtName = path.extname(filePath).slice(1);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Ошибка при получении информации о файле:', err);
          return;
        }
        filesize = stats.size / 1024;
        if (file.isFile()) {
          console.log(`${fileName} - ${fileExtName} - ${filesize}kb`);
        }
      });
    });
  });
}

lookDirectoryAndConsole(directoryPath);
