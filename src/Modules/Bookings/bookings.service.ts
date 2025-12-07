import { pool } from "../../shared/database";

const createBookingsIntoDb = async (payload: any) => {

    const { customer_id, vehicle_id, rent_start_date, rent_end_date, total_price } = payload;
    const query = `
        INSERT INTO bookings (customer_id,vehicle_id , rent_start_date, rent_end_date,total_price )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const result = await pool.query(query, [
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        total_price
    ]);
    return result
}

export const BookingServices = { createBookingsIntoDb }