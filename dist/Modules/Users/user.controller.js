"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.createUser = void 0;
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
exports.createUser = createUser;
exports.UserController = { createUser: exports.createUser };
//# sourceMappingURL=user.controller.js.map