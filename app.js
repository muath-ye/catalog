const fs = require('fs');

// Get the file path from the command line arguments
const filePath = process.argv[2];

// Read the file and print its contents to the console
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});