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
            message: "Cannot Create Bookings",
            errors: error.message
        });
    }
};
const adminAndUserView = async (req, res) => {
    const { role, id } = req.user;
    console.log("26", role, id);
    try {
        const result = await bookings_service_1.BookingServices.adminAndUserViewingService(role, id);
        res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message, errors: error });
    }
};
const updateBookingById = async (req, res) => {
    const { bookingId } = req.params;
    const { role } = req.user;
    const { status } = req.body;
    console.log('43', req.body);
    try {
        const result = await bookings_service_1.BookingServices.updateBookingRoleBasedService(bookingId, status, role);
        res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message, errors: error });
    }
};
exports.BookingsController = { createBookings, adminAndUserView, updateBookingById };
