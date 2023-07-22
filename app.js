#!/usr/bin/env node

const fs = require('fs');
const https = require('https');
const yargs = require('yargs');

// Create a command line interface using yargs
yargs.command({
  command: 'cat <path>',
  describe: 'Read the contents of a file or URL and print them to the console',
  handler(argv) {
    // Determine whether the path is a file path or a URL
    if (argv.path.startsWith('http://') || argv.path.startsWith('https://')) {
      // Read the URL and print its contents to the console
      https.get(argv.path, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          console.log(data);
        });
      }).on('error', (err) => {
        console.error(err);
      });
    } else {
      // Read the file and print its contents to the console
      fs.readFile(argv.path, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
    }
  }
});

// Parse the command line arguments
yargs.parse();