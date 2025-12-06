import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";

export const auth = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {


        try {
            const token = req.headers.authorization
            // console.log('Tk', token)
            if (!token) {
                res.send("You are  not allowed")
            }

            const decoded = jwt.verify(token as string, config.JWT_SECRET) as JwtPayload
            console.log("Decoded", decoded)
            req.user = decoded
        } catch (error) {
            console.log(error)
        }
    }

}