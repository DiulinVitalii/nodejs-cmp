import WithTime from './with-time.mjs';
import https from 'https';

const getData = (options) => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        resolve(responseData);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

const options = {
  hostname: 'jsonplaceholder.typicode.com',
  path: '/posts/1',
  method: 'GET',
};

const withTime = new WithTime();

withTime.on('begin', () => console.log('Begin to execute'));
withTime.on('end', time => console.log(`End with execute. It took ${time} seconds.`));
withTime.on('data', data => console.log('data = ', data));

withTime.execute(getData, options);

console.log(withTime.rawListeners("end"));
