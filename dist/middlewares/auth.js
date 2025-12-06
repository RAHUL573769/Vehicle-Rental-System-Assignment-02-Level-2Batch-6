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
            // console.log('Tk', token)
            if (!token) {
                res.send("You are  not allowed");
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
            console.log("Decoded", decoded);
            req.user = decoded;
        }
        catch (error) {
            console.log(error);
        }
    };
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map