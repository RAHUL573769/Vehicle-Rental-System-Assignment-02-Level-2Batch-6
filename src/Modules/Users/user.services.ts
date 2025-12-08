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
const AdminorOwnProfile = async (customerInfo: any, userId: any, data: any) => {
    const { name, email, phone, role } = data;

    const findIfExist = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId])
    if (findIfExist.rows.length < 1) {
        throw new Error('User not found')
    }

    if (customerInfo.role == "admin" || customerInfo.id == userId) {
        // update user

        const result = await pool.query(`UPDATE users SET name = $1, email = $2, phone = $3, role = $4 WHERE id = $5 RETURNING *`, [name, email, phone, role, userId])
        delete result.rows[0].password

        return result.rows[0]
    }
    else {
        throw new Error('You are not authorized to update this user')
    }

}

export const UserServices = {
    AdminorOwnProfile, createUserIntoDb, getSingleUserFromDb, getUsersFromDb, updateUsersFromDb, deleteUsersFromDb
};
