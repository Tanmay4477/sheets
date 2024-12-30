import express from "express";
import {Request, Response} from "express";
import {prismaClient} from "@repo/prisma/client";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/signup", async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await prismaClient.user.create({
        data: {
            username,
            password
        }
    });

    if(!user) {
        res.status(403).json({
            msg: "Something went wrong"
        })
    }

    res.status(200).json({
        msg: "User created",
    })
    return
})

app.post("/signin", async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await prismaClient.user.findFirst({
        where: {
            username
        }
    });

    if(!user) {
        res.status(403).json({
            msg: "User not found"
        })
        return
    }
    
    if(user) {
        if(user.password !== password){
            res.status(400).json({
                msg: "password not matched"
            })
            return
        }
    };

    const token = jwt.sign({ username }, "secret");
    res.status(400).json({
        msg: "User Login",
        token: token
    })
    return;
})

app.post("/sheet", async (req: Request, res: Response) => {
    const title: string = req.body.title;
    const slug: string = req.body.slug;
    const userId: string = req.body.userId;

    try {
        const sheet = await prismaClient.sheet.create({
            data: {
                title,
                slug,
                userId
            }
        });
        if(!sheet) {
            res.status(400).json({
                msg: "Sheet not created"
            })
            return
        }
        res.status(200).json({
            msg: "Sheet created"
        });
        return
    } catch (e) {
        res.status(400).json({
            msg: "something went wrong"
        })
    }
})

app.get("/sheet/:slug", async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const sheet = await prismaClient.sheet.findFirst({
        where: {
            slug
        }
    });

    if(!sheet) {
        res.status(400).json({
            msg: "Not found"
        })
        return
    };
    res.status(200).json({
        sheet: sheet
    })
    return;
})

app.get("/sheets", async (req: Request, res: Response) => {
    const sheets = await prismaClient.sheet.findMany();
    res.status(200).json({
        sheets: sheets
    })
    return
});

app.listen(PORT, () => {
    console.log(`Port is running on ${PORT}`);
})