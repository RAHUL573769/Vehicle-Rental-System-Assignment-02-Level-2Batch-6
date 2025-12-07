import { pool } from "../../shared/database";
import bcrypt from 'bcrypt';

const createUserIntoDb = async (payload: any) => {
    const { name, email, password, phone, role } = payload;
    const hashedPassword = await bcrypt.hash(password as string, 10)
    const query = `
        INSERT INTO users (name, email, password, phone, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const result = await pool.query(query, [
        name,
        email,
        hashedPassword,
        phone,
        role,
    ]);

    return result;
};
const getUsersFromDb = async (query: string) => {
    const result = await pool.query(query)
    console.log(result)
    return result
}
const getSingleUserFromDb = async (query: string, specificVehicleId: string) => {
    const result = await pool.query(query, [specificVehicleId])
    return result
}
const updateUsersFromDb = async (query: string, params: any[]) => {
    const result = await pool.query(query, params);
    return result
}
const deleteUsersFromDb = async (deleteQuery: string, id: string) => {
    const result = await pool.query(deleteQuery, [id])
    return result
}


export const UserServices = {
    createUserIntoDb, getSingleUserFromDb, getUsersFromDb, updateUsersFromDb, deleteUsersFromDb
};
