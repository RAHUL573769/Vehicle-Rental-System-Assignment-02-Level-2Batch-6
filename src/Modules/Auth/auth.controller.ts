import { Request, Response } from "express";
import { AuthServices } from "./auth.service";


const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    // console.log(req.body)
    const result = await AuthServices.loginIntoDb(email, password)
    res.status(200).json(
        result
    )
}
const signInUser = async (req: Request, res: Response) => {
    // const { name, email, password, phone, role } = req.body

    // console.log(req.body)
    const result = await AuthServices.signUpIntoDb(req.body)
    res.status(200).json(
        result
    )
}


export const AuthController = { loginUser, signInUser }

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