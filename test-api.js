import * as http from 'http';

function check(host, port) {
  return new Promise((resolve) => {
    http.get(`http://${host}:${port}/api/session`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ host, port, status: res.statusCode, body: data }));
    }).on('error', err => resolve({ host, port, error: err.message }));
  });
}

async function run() {
  const results = await Promise.all([
    check('127.0.0.1', 5173),
    check('localhost', 5173),
    check('127.0.0.1', 5174),
    check('localhost', 5174)
  ]);
  console.log(JSON.stringify(results, null, 2));
}

run();
