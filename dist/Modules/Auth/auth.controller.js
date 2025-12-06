"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body)
    const result = await auth_service_1.AuthServices.loginIntoDb(email, password);
    res.status(200).json({
        result
    });
};
exports.AuthController = { loginUser };
//# sourceMappingURL=auth.controller.js.map