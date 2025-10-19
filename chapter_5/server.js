const fs = require('fs');
const http = require('http');
const path = require('path');
const fsPromise = require('fs').promises;
const logEvents = require('./logEvents');
const EventEmitter = require('events');

class Emitter extends EventEmitter {}
const emitter = new Emitter();
emitter.on('log',(msg,fileName)=>logEvents(msg,fileName));

const PORT = process.env.port || 3500;

// Serve file function
const serveFile = async (filePath, contentType, res) => {
  try {
    const rawData = await fsPromise.readFile(
      filePath,
      contentType.includes('image') ? '' : 'utf8'
    );

    const data =
      contentType === 'application/json' ? JSON.parse(rawData) : rawData;

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(
      contentType === 'application/json' ? JSON.stringify(data) : data
    );
  } catch (error) {
    console.error(error);
      emitter.emit('log',`${error.name}\t${error.message}`,'errorLog.txt')

    res.statusCode = 500;
    res.end();
  }
};

// Create server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  emitter.emit('log',`${req.url}\t${req.method}`,'reqLog.txt')
  const extension = path.extname(req.url);
  let contentType;

  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
    default:
      contentType = 'text/html';
  }

  let filePath =
    req.url === '/'
      ? path.join(__dirname, 'views', 'index.html')
      : contentType === 'text/html' && req.url.slice(-1) === '/'
      ? path.join(__dirname, 'views', req.url, 'index.html')
      : contentType === 'text/html'
      ? path.join(__dirname, 'views', req.url)
      : path.join(__dirname, req.url);

  // add .html if missing
  if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    // redirect or 404
    switch (path.parse(filePath).base) {
      case 'old-page.html':
        res.writeHead(301, { Location: '/new-page.html' });
        res.end();
        break;
      case 'www-page.html':
        res.writeHead(301, { Location: '/' });
        res.end();
        break;
      default:
        serveFile(
          path.join(__dirname, 'views', '404.html'),
          'text/html',
          res
        );
    }
  }
});

server.listen(PORT, () =>
  console.log(`Server Listening at Port: ${PORT}`)
);
