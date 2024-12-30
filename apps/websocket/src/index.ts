import WebSocket, { Server } from 'ws';
import {prismaClient} from "@repo/prisma/client";

const wss: Server = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
    ws.send('Hello from WebSocket server!');

    ws.on('message', (message: string) => {
        ws.send(`Server received: ${message}`);
    });

    ws.on('close', () => {
        console.log('A client disconnected!');
    });
});
