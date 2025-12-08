"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_services_1 = require("./user.services");
const createUser = async (req, res) => {
    try {
        const result = await user_services_1.UserServices.createUserIntoDb(req.body);
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            data: result.rows[0]
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
const AdminOrOwnProfile = async (req, res) => {
    const { userId } = req.params;
    const { name, email, phone, role } = req.body;
    const data = { name, email, phone, role };
    const customerInfo = req.user;
    try {
        const result = await user_services_1.UserServices.AdminorOwnProfile(customerInfo, userId, data);
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getUsers = async (_req, res) => {
    try {
        const query = "select  * from users";
        const result = await user_services_1.UserServices.getUsersFromDb(query);
        console.log('Get Users', result.rows[0]);
        delete result.rows[0].created_at;
        delete result.rows[0].updated_at;
        res.status(200).json({
            "success": true,
            "message": "Users retrieved successfully",
            "data": result.rows
        });
    }
    catch (error) {
        res.status(404).json({
            "success": false,
            "message": "Error description",
            "errors": error.message
        });
    }
};
const getSpecificUsers = async (req, res) => {
    try {
        const specificVehicleId = req.params["id"];
        const query = `Select * from users where id= $1`;
        const result = await user_services_1.UserServices.getSingleUserFromDb(query, specificVehicleId);
        res.status(200).json({
            "success": true,
            "message": "Single User retrieved successfully",
            "data": result.rows
        });
    }
    catch (error) {
    }
};
const updateUsers = async (req, res) => {
    try {
        const userId = req.params["vehicleId"];
        const { name, email, phone, role, } = req.body;
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
        ];
        const result = await user_services_1.UserServices.updateUsersFromDb(query, params);
        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
const deleteVehicles = async (req, res) => {
    const id = req.params["vehicleId"];
    const deleteQuery = `DELETE FROM vehicles WHERE id=$1 `;
    const result = await user_services_1.UserServices.deleteUsersFromDb(deleteQuery, id);
    res.status(200).json({
        result: result
    });
};
exports.UserController = { AdminOrOwnProfile, createUser, getUsers, getSpecificUsers, updateUsers, deleteVehicles };
