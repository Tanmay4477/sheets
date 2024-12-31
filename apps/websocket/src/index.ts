import WebSocket, { Server } from 'ws';
import {prismaClient} from "@repo/prisma/client";

const wss: Server = new WebSocket.Server({ port: 8080 });

interface sheetRoomInterface {
    [slug: number]: WebSocket[]
}

const sheetRoom: sheetRoomInterface[] = [{
    1: []
}, {
    2: []
}]

wss.on('connection', (ws: WebSocket) => {
    ws.send('Hello from WebSocket server!');

    ws.on('message', async(message: string) => {
        const message1 = String(message);
        const realMessage = JSON.parse(message1);
        // const slug = realMessage.slug;

        // if(slug) {
        //     const room = sheetRoom.find(item => item.slugId === slug);
        //     if(room) {
        //         console.log(room, "room");
        //         room.websocket.push(ws);
        //     }
        //     else {
        //         sheetRoom.push({slugId: slug, websocket: [ws]});
        //     }
        // }

        // const sheet = await prismaClient.sheet.findFirst({
        //     where: {
        //         id: slug
        //     },
        //     include: {
        //         events: true
        //     }
        // });
        // if(sheet) {
        //     ws.send(`{content: ${sheet.content}, events: ${sheet.events}}`);
        // }


        // 2 nd part of code

        // const content = realMessage.content;
        // if(content) {
        //     sheetRoom[0]?.1.forEach(client => {
        //         if (client.readyState === WebSocket.OPEN) {
        //             client.send(message);
        //         }
        //     })
        // }


    });

    ws.on('close', () => {
        console.log('A client disconnected!');
    });
});
