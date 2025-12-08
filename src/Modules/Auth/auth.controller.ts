import { Request, Response } from "express";
import { AuthServices } from "./auth.service";


const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {  // console.log(req.body)
        const result = await AuthServices.loginIntoDb(email, password)
        return res.status(200).json(
            {
                success: true,
                message: "Login successful",
                data: result,
            }
        )

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Login failed",
            errors: error?.message || "Something went wrong",
        });
    }
}
const signInUser = async (req: Request, res: Response) => {
    try { // const { name, email, password, phone, role } = req.body

        // console.log(req.body)
        const result = await AuthServices.signUpIntoDb(req.body)
        return res.status(200).json(
            {
                success: true,
                message: "User registered successfully",
                data: result
            }
        )

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "User registration failed",
            errors: error?.message || "Something went wrong",
        });
    }
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