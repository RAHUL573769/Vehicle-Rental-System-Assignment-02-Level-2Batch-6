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
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({
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
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }
        next();
    };
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map