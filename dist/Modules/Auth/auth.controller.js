"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try { // console.log(req.body)
        const result = await auth_service_1.AuthServices.loginIntoDb(email, password);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Login failed",
            errors: error?.message || "Something went wrong",
        });
    }
};
const signInUser = async (req, res) => {
    try { // const { name, email, password, phone, role } = req.body
        // console.log(req.body)
        const result = await auth_service_1.AuthServices.signUpIntoDb(req.body);
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: result
        });
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "User registration failed",
            errors: error?.message || "Something went wrong",
        });
    }
};
exports.AuthController = { loginUser, signInUser };
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
//# sourceMappingURL=auth.controller.js.map