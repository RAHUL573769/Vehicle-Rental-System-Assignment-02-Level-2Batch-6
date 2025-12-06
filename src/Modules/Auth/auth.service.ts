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
    const token = jwt.sign(jwtPayLoad, jwtSecretKey, { expiresIn: '7d' });
    // console.log("JWT", jwtPayLoad)
    // console.log(isUserExists.rows[0].password)
    console.log(token)
    if (!token) {
        throw new Error("Token not Generated")
    }
    return { token: token, user: isUserExists }


}

export const AuthServices = { loginIntoDb }