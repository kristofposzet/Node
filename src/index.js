require('dotenv').config();
const http = require('http'),
  { createReadStream } = require('fs'),
  { resolve } = require('path');

const PORT = process.env.PORT || 8080,
  green = (text) => `\x1b[32m${text}\x1b[0m 🎉`,
  filePath = resolve(__dirname, './file.txt'),
  server = http.createServer();

const isValidRequest = (method, url) => method === 'GET' && url === '/';

const sendValidResponse = (res) => {
  res.setHeader('Content-Type', 'text/html');
  return createReadStream(filePath).pipe(res);
};

const sendBadRequest = (res) => {
  res.statusCode = 404;
  res.end('Wrong url or method...');
};

server.on('request', (req, res) => {
  const { url, method } = req;
  if (isValidRequest(method, url)) {
    return sendValidResponse(res);
  }
  sendBadRequest(res);
});

server.listen(PORT, () => process.stdout.write(`Server listening on port: ${green(PORT)}\n`));
