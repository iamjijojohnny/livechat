import WebSocket, { WebSocketServer } from 'ws';
import { faker } from '@faker-js/faker';

const wss = new WebSocketServer({ port: 8787 })


wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
});

setInterval(() => {
    wss.clients.forEach((client) => {
        if (client.readyState == WebSocket.OPEN) {
            client.send(JSON.stringify({
                id: faker.random.numeric(),
                user: {
                    name: faker.name.firstName(),
                    url: "https://picsum.photos/200"
                },
                msg: faker.lorem.paragraph(),
                date_created: faker.date.recent()
              }));
        }
      })
}, 1000);