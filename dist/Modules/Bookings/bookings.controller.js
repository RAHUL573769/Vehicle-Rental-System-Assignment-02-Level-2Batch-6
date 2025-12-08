"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsController = void 0;
const bookings_service_1 = require("./bookings.service");
const createBookings = async (req, res) => {
    try {
        const result = await bookings_service_1.BookingServices.createBookingsIntoDb(req.body);
        console.log(req.body);
        return res.status(200).json({
            success: true,
            message: "Booking created successfully",
            data: result
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
exports.BookingsController = { createBookings };
//# sourceMappingURL=bookings.controller.js.map