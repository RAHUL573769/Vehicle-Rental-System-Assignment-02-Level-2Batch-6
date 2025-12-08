export declare const BookingServices: {
    updateBookingRoleBasedService: (bookingId: any, status: string, role: string) => Promise<any>;
    createBookingsIntoDb: (payload: any) => Promise<void>;
    adminAndUserViewingService: (role: string, id: number) => Promise<any[] | undefined>;
};
//# sourceMappingURL=bookings.service.d.ts.map