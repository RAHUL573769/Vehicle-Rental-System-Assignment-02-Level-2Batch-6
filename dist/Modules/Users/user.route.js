"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = require("./user.controller");
const auth_1 = require("../../middlewares/auth");
router.post("/createUser", (0, auth_1.auth)("admin"), user_controller_1.UserController.createUser);
router.get("/users", user_controller_1.UserController.getUsers);
router.get("/users/:id", user_controller_1.UserController.getSpecificUsers);
router.patch("/users/:id", user_controller_1.UserController.updateUsers);
router.delete("/users/:id", user_controller_1.UserController.deleteVehicles);
exports.UserRoute = router;
//# sourceMappingURL=user.route.js.map