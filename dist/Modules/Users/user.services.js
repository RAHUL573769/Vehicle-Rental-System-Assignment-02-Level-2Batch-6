"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const database_1 = require("../../shared/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserIntoDb = async (payload) => {
    const { name, email, password, phone, role } = payload;
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const query = `
        INSERT INTO users (name, email, password, phone, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const result = await database_1.pool.query(query, [
        name,
        email,
        hashedPassword,
        phone,
        role,
    ]);
    return result;
};
const getUsersFromDb = async (query) => {
    const result = await database_1.pool.query(query);
    console.log(result);
    return result;
};
const getSingleUserFromDb = async (query, specificVehicleId) => {
    const result = await database_1.pool.query(query, [specificVehicleId]);
    return result;
};
const updateUsersFromDb = async (query, params) => {
    const result = await database_1.pool.query(query, params);
    return result;
};
const deleteUsersFromDb = async (deleteQuery, id) => {
    const result = await database_1.pool.query(deleteQuery, [id]);
    return result;
};
exports.UserServices = {
    createUserIntoDb, getSingleUserFromDb, getUsersFromDb, updateUsersFromDb, deleteUsersFromDb
};
//# sourceMappingURL=user.services.js.map