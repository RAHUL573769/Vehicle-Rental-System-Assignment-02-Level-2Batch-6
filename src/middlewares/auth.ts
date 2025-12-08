import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";



export const auth = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): any => {
        try {
            const header = req.headers.authorization;

            if (!header || !header.startsWith("Bearer ")) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized: No token provided",
                });
            }

            const token = header.split(" ")[1]; //
            console.log("Token", token)
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized: No token provided",
                });
            }

            const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;

            req.user = decoded;

            // Role checking
            if (roles.length > 0 && !roles.includes(decoded['role'])) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: You do not have permission",
                });

            }
            next()

        } catch (error: any) {
            console.log(error.name)

            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    "success": false,
                    "message": error.message,
                    "errors": "Token Expired "
                });

            }
            return res.status(401).json({
                "success": false,
                "message": error.message,
                "errors": "Invalid or malformed token",
            });

        }

    };
};
