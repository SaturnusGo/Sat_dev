const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', ws => {
  console.log('New client connected');

  ws.on('message', message => {
    console.log('Received message:', message);
    ws.send('Server received your message');
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
