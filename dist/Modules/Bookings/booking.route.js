"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoute = void 0;
const express_1 = __importDefault(require("express"));
const bookings_controller_1 = require("./bookings.controller");
const router = express_1.default.Router();
router.post("/v1/bookings", bookings_controller_1.BookingsController.createBookings);
exports.BookingRoute = router;
//# sourceMappingURL=booking.route.js.map