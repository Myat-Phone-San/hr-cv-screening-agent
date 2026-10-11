const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const tokenHandler = require('./api/token');

function createServer() {
  return http.createServer(async (req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    if (pathname === '/api/token') {
      res.status = code => { res.statusCode = code; return res; };
      res.json = body => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(body));
        return res;
      };
      await tokenHandler(req, res);
      return;
    }
    // Serve only the website, never environment files or server source.
    if (pathname !== '/' && pathname !== '/index.html') {
      res.writeHead(404).end('Not found');
      return;
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { Allow: 'GET, HEAD' }).end('Method not allowed');
      return;
    }
    try {
      const html = await fs.promises.readFile(path.join(__dirname, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(req.method === 'HEAD' ? undefined : html);
    } catch {
      res.writeHead(500).end('Unable to load the website');
    }
  });
}

if (require.main === module) {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) process.loadEnvFile(envPath);
  const port = Number(process.env.PORT || 3000);
  const server = createServer();
  server.on('error', error => {
    console.error(`Unable to start server: ${error.message}`);
    process.exitCode = 1;
  });
  server.listen(port, '127.0.0.1', () => {
    console.log(`CV Screening: http://localhost:${server.address().port}`);
  });
}

module.exports = { createServer };
