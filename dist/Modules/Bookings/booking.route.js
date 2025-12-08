"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoute = void 0;
const express_1 = __importDefault(require("express"));
const bookings_controller_1 = require("./bookings.controller");
const auth_1 = require("../../middlewares/auth");
const auth_types_1 = require("../../types/auth.types");
const router = express_1.default.Router();
router.post("/v1/bookings", (0, auth_1.auth)(auth_types_1.UserRoles.admin, auth_types_1.UserRoles.customer), bookings_controller_1.BookingsController.createBookings);
exports.BookingRoute = router;
//# sourceMappingURL=booking.route.js.map