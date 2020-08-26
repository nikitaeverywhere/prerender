const prerender = require('prerender');
const server = prerender({
  chromeFlags: ['--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars', '--disable-dev-shm-usage'],
  forwardHeaders: true,
  chromeLocation: process.env.CHROME_BIN || '/usr/bin/chromium-browser',
  port: process.env.PORT_PRERENDER || 3000,
  pageDoneCheckInterval: 100,
  waitAfterLastRequest: 200
});

server.use(require('prerender-request-blacklist'));
server.use(prerender.blacklist());
server.use(prerender.httpHeaders());

server.start();