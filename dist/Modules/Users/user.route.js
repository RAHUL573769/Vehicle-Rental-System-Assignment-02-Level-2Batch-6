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
const auth_types_1 = require("../../types/auth.types");
router.get("/", user_controller_1.UserController.getUsers);
// router.post("/", auth("admin"), UserController.createUser)
router.get("/:id", user_controller_1.UserController.getSpecificUsers);
router.put('/:userId', (0, auth_1.auth)(auth_types_1.UserRoles.admin), user_controller_1.UserController.AdminOrOwnProfile);
router.delete("/:id", (0, auth_1.auth)(auth_types_1.UserRoles.admin), user_controller_1.UserController.deleteVehicles);
exports.UserRoute = router;
//# sourceMappingURL=user.route.js.map