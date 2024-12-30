import cron from "node-cron";
import {prismaClient} from "@repo/prisma/client";

cron.schedule('* * * * *', async() => {
    // event ko utha kr sheet me daalo
    const sheets = await prismaClient.sheet.findMany({
        include: {
            events: true
        }
    });

    sheets.forEach(async(item) => {
        if(item.events.length > 0) {
            const events = item.events;
            let content = "";
            events.forEach((item2) => {
                if(item2.type === "ADD"){
                    content+=item2.content
                }
                else if (item2.type === "DELETE") {
                    if(content.endsWith(item2.content)) {
                        content = content.slice(0, -item2.content.length);
                    }
                }
            })
            await prismaClient.sheet.update({
                where: {
                    id: item.id,
                },
                data: {
                    content: content
                }
            });
        };
    });
});
