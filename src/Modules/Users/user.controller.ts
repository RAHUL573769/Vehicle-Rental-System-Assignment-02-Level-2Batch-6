import { Request, Response } from "express";
import { UserServices } from "./user.services";

export const createUser = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.createUserIntoDb(req.body);

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const UserController={createUser}