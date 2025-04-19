const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const clients = new Map();

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'register') {
      clients.set(data.id, ws);
      ws.id = data.id;
    } else {
      const target = clients.get(data.to);
      if (target) {
        target.send(JSON.stringify(data));
      }
    }
  });

  ws.on('close', () => {
    clients.delete(ws.id);
  });
});

console.log('Signaling server running on ws://localhost:8080');
