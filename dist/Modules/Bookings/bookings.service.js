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
    if (vehicleInfo.rows[0].availability_status === "unavailable") {
        throw new Error("Vehicle  is Unavailable");
    }
    const customerInfo = await database_1.pool.query(`SELECT name, email FROM users WHERE id = $1`, [customer_id]);
    console.log('CI', customerInfo.rows[0]);
    if (customerInfo.rowCount === 0) {
        throw new Error("Customer not found");
    }
    const customer = customerInfo.rows[0];
    await database_1.pool.query(`UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`, [vehicle_id]);
    const vehicle = vehicleInfo.rows[0];
    console.log("New Vehicle Data", vehicle);
    const newCustomerData = {
        name: customer.name,
        email: customer.email
    };
    console.log("New Customer Data", newCustomerData);
    // Price calculation
    const totalDayCalculation = (0, moment_1.default)(rent_end_date).diff(rent_start_date, "days");
    const totalPriceCalculation = vehicle.daily_rent_price * totalDayCalculation;
    const newVehicleData = {
        vehicle_name: vehicle.vehicle_name,
        daily_rent_price: vehicle.daily_rent_price
        // registration_number: vehicle.registration_number,
        // availability_status: vehicle.availability_status,
        // type: vehicle.type
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
    // // Remove fields before returning
    // delete booking.customer;
    // const parsedVehicle = JSON.parse(booking.vehicle);
    // delete parsedVehicle.availability_status;
    // delete parsedVehicle.type;
    // booking.vehicle = parsedVehicle;
    return booking;
};
exports.BookingServices = { createBookingsIntoDb };
//# sourceMappingURL=bookings.service.js.map