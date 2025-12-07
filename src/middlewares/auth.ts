import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";



export const auth = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): any => {
        try {
            const token = req.headers.authorization;

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


        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });

        }
        next();
    };
};
