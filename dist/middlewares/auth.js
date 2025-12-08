"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...roles) => {
    return (req, res, next) => {
        try {
            const header = req.headers.authorization;
            if (!header || !header.startsWith("Bearer ")) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized: No token provided",
                });
            }
            const token = header.split(" ")[1]; //
            console.log("Token", token);
            if (!token) {
                return res.status(403).json({
                    success: false,
                    message: "Unauthorized: No token provided",
                });
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
            req.user = decoded;
            // Role checking
            if (roles.length > 0 && !roles.includes(decoded['role'])) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: You do not have permission",
                });
            }
            next();
        }
        catch (error) {
            console.log(error.name);
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
exports.auth = auth;
