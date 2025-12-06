"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../config"));
const database_1 = require("../../shared/database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginIntoDb = async (email, password) => {
    const isUserExists = await database_1.pool.query("SELECT * FROM  users WHERE   email=$1", [email]);
    if ((isUserExists).rows.length === 0) {
        throw new Error("Your Email isnot present in database");
    }
    // console.log('y', isUserExists.rows[0].password)
    const passwordMatch = await bcrypt_1.default.compare(password, isUserExists.rows[0].password);
    if (!passwordMatch) {
        throw new Error("Your Password doesnot match");
    }
    const jwtSecretKey = config_1.default.JWT_SECRET;
    // console.log("User Data", isUserExists)
    const jwtPayLoad = {
        email: isUserExists.rows[0].email,
        password: isUserExists.rows[0].password,
        role: isUserExists.rows[0].role
    };
    const token = jsonwebtoken_1.default.sign(jwtPayLoad, jwtSecretKey, { expiresIn: '7d' });
    // console.log("JWT", jwtPayLoad)
    // console.log(isUserExists.rows[0].password)
    console.log(token);
    if (!token) {
        throw new Error("Token not Generated");
    }
    return { token: token, user: isUserExists };
};
exports.AuthServices = { loginIntoDb };
//# sourceMappingURL=auth.service.js.map