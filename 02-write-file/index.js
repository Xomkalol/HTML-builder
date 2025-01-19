const fs = require('fs');
const path = require('path');
const { stdout, stdin } = process;

fs.writeFile(path.join(__dirname, 'text.txt'), '', (err) => {
  if (err) throw err;
  console.log('text.txt File was created');
});
stdout.write(
  'Please enter your message to add text.txt file or type exit or ctrl+C to terminate code \n',
);
stdin.on('data', (data) => {
  const numString = data.toString().trim();
  if (numString.toLowerCase() === 'exit') {
    stdout.write('pressed exit. Farewell!')
    process.exit();
  }
  fs.appendFile(path.join(__dirname, 'text.txt'), numString + '\n', (err) => {
    if (err) {
      console.error('Error appending to file:', err);
    } else {
      stdout.write(
        'Text added to file. Continue typing or type "exit" to quit:\n',
      );
    }
  });
});

process.on('SIGINT', () => {
  stdout.write('pressed CTRL + C. farewell!');
  process.exit();
});
