const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', ws => {
  console.log('new user connected');

  ws.on('message', data => {
    const decoder = new TextDecoder('utf-8');
    const text = decoder.decode(data);

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    });
  });
});
