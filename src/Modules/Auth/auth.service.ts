import config from "../../config"
import { pool } from "../../shared/database"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
const loginIntoDb = async (email: string, password: string) => {


    const isUserExists = await pool.query("SELECT * FROM  users WHERE   email=$1", [email])

    if ((isUserExists).rows.length === 0) {
        throw new Error("Your Email isnot present in database")
    }
    // console.log('y', isUserExists.rows[0].password)
    const passwordMatch = await bcrypt.compare(password, isUserExists.rows[0].password)
    if (!passwordMatch) {
        throw new Error("Your Password doesnot match")
    }
    const jwtSecretKey = config.JWT_SECRET
    // console.log("User Data", isUserExists)
    const jwtPayLoad = {
        email: isUserExists.rows[0].email,
        password: isUserExists.rows[0].password,
        role: isUserExists.rows[0].role

    }
    delete isUserExists.rows[0].password
    const token = jwt.sign(jwtPayLoad, jwtSecretKey, { expiresIn: '7d' });
    // console.log("JWT", jwtPayLoad)
    // console.log(isUserExists.rows[0].password)
    console.log(token)
    if (!token) {
        throw new Error("Token not Generated")
    }



    delete isUserExists.rows[0].created_at
    delete isUserExists.rows[0].updated_at
    return {
        success: true,
        "message": "Login successful",
        "data": {
            "token": token,
            "user": isUserExists.rows[0]
        }
    }

    // {
    //   "success": true,
    //   "message": "Login successful",
    //   "data": {
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    //     "user": {
    //       "id": 1,
    //       "name": "John Doe",
    //       "email": "john.doe@example.com",
    //       "phone": "+1234567890",
    //       "role": "customer"
    //     }
    //   }
    // }
}
const signUpIntoDb = async (payload: any) => {

    const { name, email, password, phone, role } = payload;
    const findUserIsExist = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])

    if (findUserIsExist.rows.length > 0) {
        throw new Error('User Email already exists')
    }
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
    return result?.rows[0];

}
export const AuthServices = { loginIntoDb, signUpIntoDb }

// {
//   "success": true,
//   "message": "Login successful",
//   "data": {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
//     "user": {
//       "id": 1,
//       "name": "John Doe",
//       "email": "john.doe@example.com",
//       "phone": "+1234567890",
//       "role": "customer"
//     }
//   }
// }