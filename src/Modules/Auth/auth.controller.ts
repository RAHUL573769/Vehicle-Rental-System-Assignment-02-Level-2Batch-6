import { Request, Response } from "express";
import { AuthServices } from "./auth.service";


const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    // console.log(req.body)
    const result = await AuthServices.loginIntoDb(email, password)
    res.status(200).json({
        result
    })
}
export const AuthController = { loginUser }