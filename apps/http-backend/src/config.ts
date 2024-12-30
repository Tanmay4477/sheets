import { Response, NextFunction} from "express";
import jwt from "jsonwebtoken"


function commonAuth(req: any, res: Response, next: NextFunction) :any {
    try {
        const token = req.header('Authorization') as string;

        if (!token) {
            return res.status(400).json({msg: "Authorization not allowed, Please provide the token"});
        }
        if (token.split(" ")[0] !== "Bearer") {
            return res.status(400).json({msg: "Are you sure, you are using Bearer?"})
        }

        try {
            //@ts-ignore
            const payload = jwt.verify(token.split(" ")[1], "secret");
            //@ts-ignore
            req.userId = payload.userId;
        } catch (error) {
            return res.status(400).json({msg: "Token invalid"});
        }
        next();
    } catch (error) {
        throw new Error("Something went wrong");
    }
}
export default commonAuth;