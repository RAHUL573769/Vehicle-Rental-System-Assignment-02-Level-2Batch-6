import { Request, Response } from "express";
export declare const BookingsController: {
    createBookings: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    adminAndUserView: (req: Request, res: Response) => Promise<void>;
    updateBookingById: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=bookings.controller.d.ts.map