"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const database_1 = require("../../shared/database");
const createUserIntoDb = async (payload) => {
    const { name, email, password, phone, role } = payload;
    const query = `
        INSERT INTO users (name, email, password, phone, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const result = await database_1.pool.query(query, [
        name,
        email,
        password,
        phone,
        role,
    ]);
    return result;
};
exports.UserServices = {
    createUserIntoDb,
};
//# sourceMappingURL=user.services.js.map