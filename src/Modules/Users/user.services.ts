import { pool } from "../../shared/database";

const createUserIntoDb = async (payload: any) => {
    const { name, email, password, phone, role } = payload;

    const query = `
        INSERT INTO users (name, email, password, phone, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const result = await pool.query(query, [
        name,
        email,
        password,
        phone,
        role,
    ]);

    return result;
};

export const UserServices = {
    createUserIntoDb,
};
