const fs = require('fs');
const path = require('path');
const currentPath = __dirname;
const txtPath = path.join(currentPath, 'text.txt');

const stream = fs.createReadStream(txtPath);
stream.on('data', (chunk) => console.log(chunk.toString()));
