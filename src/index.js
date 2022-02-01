require('dotenv').config();
const http = require('http');
const PORT = process.env.PORT || 8080,
  green = (text) => `\x1b[32m${text}\x1b[0m 🎉`,
  server = http.createServer();

server.on('request', (req, res) => {
  const { url } = req;
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(url));
});

server.listen(PORT, () => process.stdout.write(`Server listening on port: ${green(PORT)}\n`));
