const http = require('http');

const PORT = process.env.PORT || 8000;

function exitOnSignal(signal) {
  process.on(signal, function () {
    console.log(`\nCaught ${signal}`);
    process.exit(1);
  });
}

async function getBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      resolve(body);
    });
  });
}

function logWithTimestamp(...args) {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZoneName: 'short',
  });
  console.log(timestamp, ...args);
}

function computeDuration(start) {
  const [s, ns] = process.hrtime(start);
  return s * 1000 + Math.round(ns / 1000) / 1000;
}

exitOnSignal('SIGINT');
exitOnSignal('SIGTERM');

const requestListener = async function (req, res) {
  try {
    const body = await getBody(req);
    const before = process.hrtime();
    const data = JSON.parse(body);
    const len = data.hits.length;

    // Definitely not idiomatic, but trying to write an efficient version
    const newHits = new Array(len);
    for (let i = 0; i < len; ++i) {
      const hit = data.hits[i];
      delete hit._rankingOrderedValues;
      newHits[len - i - 1] = hit;
    }
    const newHitsStr = JSON.stringify(newHits);

    const duration = computeDuration(before);
    const result = `{"hits":${newHitsStr},"duration":${duration}}`;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(result);
    logWithTimestamp(`Successfuly reranked ${len} hits`);
  } catch (err) {
    res.writeHead(500);
    res.end('Internal server error');
    logWithTimestamp('Error during reranking:\n', err);
  }
};

const server = http.createServer(requestListener);
server.on('listening', () => {
  console.log(`Listening on port ${PORT}`);
});
server.listen(PORT);
