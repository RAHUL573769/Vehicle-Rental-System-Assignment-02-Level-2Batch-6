"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const database_1 = require("../../shared/database");
const createBookingsIntoDb = async (payload) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date, total_price } = payload;
    const query = `
        INSERT INTO bookings (customer_id,vehicle_id , rent_start_date, rent_end_date,total_price )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const result = await database_1.pool.query(query, [
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        total_price
    ]);
    return result;
};
exports.BookingServices = { createBookingsIntoDb };
//# sourceMappingURL=bookings.service.js.map