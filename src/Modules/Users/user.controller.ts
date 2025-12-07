import { Request, Response } from "express";
import { UserServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
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


const getUsers = async (_req: Request, res: Response) => {

    try {
        const query = "select  * from users"
        const result = await UserServices.getUsersFromDb(query)
        console.log('Get Users', result.rows[0])

        delete result.rows[0].created_at
        delete result.rows[0].updated_at

        res.status(200).json({

            "success": true,
            "message": "Users retrieved successfully",
            "data":
                result.rows


        })

    } catch (error: any) {




        res.status(404).json({

            "success": false,
            "message": "Error description",
            "errors": error.message


        })

    }
}

const getSpecificUsers = async (req: Request, res: Response) => {
    try {

        const specificVehicleId = req.params["id"]
        const query = `Select * from users where id= $1`
        const result = await UserServices.getSingleUserFromDb(query, specificVehicleId as string)
        res.status(200).json({

            "success": true,
            "message": "Single User retrieved successfully",
            "data":
                result.rows


        })


    } catch (error) {

    }
}













const updateUsers = async (req: Request, res: Response) => {
    try {
        const userId = req.params["vehicleId"];

        const {
            name,
            email,
            phone,
            role,

        } = req.body;

        const query = `
            UPDATE users 
            SET 
                name = $1,
                email = $2,
                phone = $3,
                role = $4,
               
            WHERE id = $5
            RETURNING *;
        `;

        const params = [
            name,
            email,
            phone,
            role,
            userId
        ]

        const result = await UserServices.updateUsersFromDb(query, params)

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}




const deleteVehicles = async (req: Request, res: Response) => {
    const id = req.params["vehicleId"];
    const deleteQuery = `DELETE FROM vehicles WHERE id=$1 `
    const result = await UserServices.deleteUsersFromDb(deleteQuery, id as string)
    res.status(200).json({
        result: result
    })
}






export const UserController = { createUser, getUsers, getSpecificUsers, updateUsers, deleteVehicles }