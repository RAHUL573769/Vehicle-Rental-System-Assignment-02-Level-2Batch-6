"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const moment_1 = __importDefault(require("moment"));
const database_1 = require("../../shared/database");
const createBookingsIntoDb = async (payload) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
    const vehicleInfo = await database_1.pool.query(`SELECT * FROM vehicles where id=$1`, [vehicle_id]);
    if (vehicleInfo.rowCount === 0) {
        throw new Error("Vehicle not found..Try Again");
    }
    // console.log("VI", vehicleInfo.rows[0].availability_status)
    if (vehicleInfo.rows[0].availability_status !== "available") {
        throw new Error("Vehicle  is Unavailable");
    }
    if (vehicleInfo) {
        await database_1.pool.query(`UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`, [vehicle_id]);
    }
    const customerInfo = await database_1.pool.query(`SELECT name, email FROM users WHERE id = $1`, [customer_id]);
    if (customerInfo.rowCount === 0) {
        throw new Error("Customer not found");
    }
    const customer = customerInfo.rows[0];
    const vehicle = vehicleInfo.rows[0];
    console.log("New Vehicle Data", vehicle);
    const newCustomerData = {
        name: customer.name,
        email: customer.email
    };
    console.log("New Customer Data", newCustomerData);
    const totalDayCalculation = (0, moment_1.default)(rent_end_date).diff(rent_start_date, "days");
    const totalPriceCalculation = vehicle.daily_rent_price * totalDayCalculation;
    const newVehicleData = {
        vehicle_name: vehicle.vehicle_name,
        daily_rent_price: vehicle.daily_rent_price,
        registration_number: vehicle.registration_number,
        // availability_status: vehicle.availability_status,
    };
    const rentalData = await database_1.pool.query(`INSERT INTO bookings 
            (customer_id, vehicle_id, rent_start_date, rent_end_date, status, total_price, customer, vehicle) 
            VALUES ($1, $2, $3, $4, 'active', $5, $6, $7)
            RETURNING *`, [
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        totalPriceCalculation,
        newCustomerData,
        newVehicleData // FIXED
    ]);
    const booking = rentalData.rows[0];
    delete booking.customer;
    delete booking.created_at;
    delete booking.updated_at;
    console.log('Bookings', booking);
    return booking;
};
// export const createBookingsIntoDb = async (payload: any) => {
//     const client = await pool.connect();
//     try {
//         await client.query("BEGIN"); // Start transaction
//         const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
//         const vehicleRes = await client.query(
//             `SELECT * FROM vehicles WHERE id = $1`,
//             [vehicle_id]
//         );
//         if (vehicleRes.rowCount === 0) {
//             throw new Error("Vehicle not found");
//         }
//         const vehicle = vehicleRes.rows[0];
//         // Check availability
//         if (vehicle.availability_status !== "available") {
//             throw new Error("Vehicle is not available");
//         }
//         // -----------------------------------------
//         // 2. Get customer info
//         // -----------------------------------------
//         const customerRes = await client.query(
//             `SELECT name, email FROM users WHERE id = $1`,
//             [customer_id]
//         );
//         if (customerRes.rowCount === 0) {
//             throw new Error("Customer not found");
//         }
//         const customer = customerRes.rows[0];
//         // -----------------------------------------
//         // 3. Calculate total price
//         // -----------------------------------------
//         const totalDays = moment(rent_end_date).diff(
//             moment(rent_start_date),
//             "days"
//         );
//         if (totalDays <= 0) {
//             throw new Error("Invalid rental dates (end date must be after start date)");
//         }
//         const totalPrice = vehicle.daily_rent_price * totalDays;
//         const newCustomerData = {
//             name: customer.name,
//             email: customer.email,
//         };
//         const newVehicleData = {
//             vehicle_name: vehicle.vehicle_name,
//             daily_rent_price: vehicle.daily_rent_price,
//             registration_number: vehicle.registration_number,
//         };
//         // -----------------------------------------
//         // 4. Create booking
//         // -----------------------------------------
//         const bookingRes = await client.query(
//             `
//       INSERT INTO bookings 
//         (customer_id, vehicle_id, rent_start_date, rent_end_date, status, total_price, customer, vehicle) 
//       VALUES ($1, $2, $3, $4, 'active', $5, $6, $7)
//       RETURNING *`,
//             [
//                 customer_id,
//                 vehicle_id,
//                 rent_start_date,
//                 rent_end_date,
//                 totalPrice,
//                 newCustomerData,
//                 newVehicleData,
//             ]
//         );
//         const booking = bookingRes.rows[0];
//         // -----------------------------------------
//         // 5. Update vehicle to booked
//         // -----------------------------------------
//         await client.query(
//             `UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`,
//             [vehicle_id]
//         );
//         await client.query("COMMIT"); // Finish transaction
//         // -----------------------------------------
//         // 6. Clean response object
//         // -----------------------------------------
//         delete booking.customer;
//         delete booking.created_at;
//         delete booking.updated_at;
//         return booking;
//     } catch (error) {
//         await client.query("ROLLBACK");
//         throw error;
//     } finally {
//         client.release();
//     }
// };
const adminAndUserViewingService = async (role, id) => {
    let result;
    if (role === "admin") {
        result = await database_1.pool.query(`SELECT * FROM bookings`);
        console.log("Result", result);
        result.rows = result.rows.map(row => {
            // Parse JSON fields
            console.log("Row", row);
            const vehicle = row.vehicle ? row.vehicle : null;
            const customer = row.customer ? row.customer : null;
            // console.log('dr', customer)
            // Remove unwanted properties
            if (vehicle) {
                delete vehicle.daily_rent_price;
                delete vehicle.type;
                delete vehicle.availability_status;
            }
            //               "data": [
            //     {
            //       "id": 1,
            //       "customer_id": 1,
            //       "vehicle_id": 2,
            //       "rent_start_date": "2024-01-15",
            //       "rent_end_date": "2024-01-20",
            //       "total_price": 250,
            //       "status": "active",
            //       "customer": {
            //         "name": "John Doe",
            //         "email": "john.doe@example.com"
            //       },
            //       "vehicle": {
            //         "vehicle_name": "Honda Civic 2023",
            //         "registration_number": "XYZ-5678"
            //       }
            //     }
            //   ]
            // }
            return {
                ...row,
                vehicle,
                customer
            };
        });
        return result.rows;
    }
    else if (role === "customer") {
        result = await database_1.pool.query(`SELECT * FROM bookings WHERE customer_id = $1`, [id]);
        result.rows = result.rows.map(row => {
            const vehicle = row.vehicle ? JSON.parse(row.vehicle) : null;
            const customer = row.customer ? JSON.parse(row.customer) : null;
            if (vehicle) {
                delete vehicle.availability_status;
            }
            // Return cleaned record
            return {
                ...row,
                vehicle,
                customer
            };
        });
        return result.rows;
    }
};
const updateBookingRoleBasedService = async (bookingId, status, role) => {
    if (status === "cancelled" && role === "admin") {
        throw new Error('Only can cancelled by customer');
    }
    if (status === "returned" && role === "customer") {
        throw new Error('Only can returned by admin');
    }
    if (status === "cancelled" && role === "customer") {
        const result = await database_1.pool.query(`UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`, [status, bookingId]);
        await database_1.pool.query(`UPDATE vehicles SET availability_status = 'available' WHERE id = $1 RETURNING *`, [result.rows[0].vehicle_id]);
        delete result.rows[0].vehicle;
        delete result.rows[0].customer;
        return result.rows[0];
    }
    else if (status === "returned" && role === "admin") {
        const findBookings = await database_1.pool.query(`SELECT * FROM bookings WHERE id = $1`, [bookingId]);
        const fullVehicle = JSON.parse(findBookings.rows[0].vehicle);
        const data = {
            ...fullVehicle,
            availability_status: "available"
        };
        const result = await database_1.pool.query(`UPDATE bookings SET status = $1 , vehicle = $3 WHERE id = $2 RETURNING *`, [status, bookingId, data]);
        await database_1.pool.query(`UPDATE vehicles SET availability_status = 'available' WHERE id = $1 RETURNING *`, [result.rows[0].vehicle_id]);
        delete result.rows[0].customer;
        const vehicleDataParse = result.rows[0].vehicle ? JSON.parse(result.rows[0].vehicle) : null;
        result.rows[0].vehicle = vehicleDataParse;
        return await result.rows[0];
    }
    return [];
};
exports.BookingServices = { updateBookingRoleBasedService, createBookingsIntoDb, adminAndUserViewingService };
//# sourceMappingURL=bookings.service.js.map