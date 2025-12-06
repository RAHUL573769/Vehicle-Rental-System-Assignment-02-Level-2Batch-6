import { Request, Response } from "express";


const loginUser = async (req: Request, res: Response) => {
    console.log(req.body)
    console.log(res)

}
export const AuthController = { loginUser }