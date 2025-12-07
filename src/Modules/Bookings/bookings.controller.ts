import { BookingServices } from "./bookings.service";
import { Request, Response } from "express";

const createBookings = async (req: Request, res: Response) => {
    try {
        const result = await BookingServices.createBookingsIntoDb(req.body);
        console.log(req.body)
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const BookingsController = { createBookings }