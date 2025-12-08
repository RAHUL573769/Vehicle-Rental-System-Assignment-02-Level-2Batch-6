import { BookingServices } from "./bookings.service";
import { Request, Response } from "express";
import { JwtPayload } from 'jsonwebtoken';

const createBookings = async (req: Request, res: Response) => {
    try {
        const result = await BookingServices.createBookingsIntoDb(req.body);
        console.log(req.body)
        return res.status(200).json({
            success: true,
            message: "Booking created successfully",
            data: result
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            success: false,
            message: "Cannot Create Bookings",
            errors: error
        });
    }
};


const adminAndUserView = async (req: Request, res: Response) => {
    const { role, id } = req.user as JwtPayload
    console.log("26", role, id)
    try {
        const result = await BookingServices.adminAndUserViewingService(role, id);
        res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: result,
        });
    }
    catch (error: any) {
        res.status(500).json({ success: false, message: error.message, errors: error });
    }
}
const updateBookingById = async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    const { role } = req.user as JwtPayload;
    const { status } = req.body;
    console.log('43', req.body)
    try {
        const result = await BookingServices.updateBookingRoleBasedService(bookingId, status, role);
        res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message, errors: error });
    }

}
export const BookingsController = { createBookings, adminAndUserView, updateBookingById }