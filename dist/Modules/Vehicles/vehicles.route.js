"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const auth_types_1 = require("../../types/auth.types");
const vehicles_controllers_1 = require("./vehicles.controllers");
const router = express_1.default.Router();
router.post("/v1/vehicles", (0, auth_1.auth)(auth_types_1.UserRoles.admin), vehicles_controllers_1.VehicleController.createVehicles);
router.get("/v1/vehicles", vehicles_controllers_1.VehicleController.getVehicles);
router.get("/v1/vehicles/:id", vehicles_controllers_1.VehicleController.getSingleVehicles);
router.put("/v1/vehicles/:vehicleId", (0, auth_1.auth)(auth_types_1.UserRoles.admin), vehicles_controllers_1.VehicleController.updateVehicles);
router.delete("/v1/vehicles/:vehicleId", (0, auth_1.auth)(auth_types_1.UserRoles.admin), vehicles_controllers_1.VehicleController.deleteVehicles);
exports.VehicleRoute = router;
//# sourceMappingURL=vehicles.route.js.map