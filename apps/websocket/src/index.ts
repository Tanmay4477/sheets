import WebSocket, { Server } from 'ws';
import {prismaClient} from "@repo/prisma/client";

const wss: Server = new WebSocket.Server({ port: 8080 });

const sheetRoom = [{
    slugId: "123",
    websocket: []
}, {
    slugId: "124",
    websocket: []
}]

wss.on('connection', (ws: WebSocket) => {
    ws.send('Hello from WebSocket server!');
    console.log(ws);

    ws.on('message', async(message: string) => {
        console.log(`${message}`);
        const realMessage = JSON.parse(message);
        const slug = realMessage.slug;

        if(slug) {
            const room = sheetRoom.find(item => item.slugId === slug);
            if(room) {
                room.websocket.push();
            }
        }

        const sheet = await prismaClient.sheet.findFirst({
            where: {
                slug: slug
            },
            include: {
                events: true
            }
        });
        if(sheet) {
            ws.send(`{content: ${sheet.content}, events: ${sheet.events}}`);
        }
        else {
            ws.send(`Slug not found`)
        }
    });

    ws.on('close', () => {
        console.log('A client disconnected!');
    });
});
