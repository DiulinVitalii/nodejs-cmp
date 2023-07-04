import csv from 'csvtojson';
import { pipeline } from 'stream';
import fs from 'fs';

pipeline(
  fs.createReadStream('./csvdirectory/nodejs-hw1-ex1.csv'),
  csv(),
  fs.createWriteStream('./json-object-directory/json-object.txt'),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);
