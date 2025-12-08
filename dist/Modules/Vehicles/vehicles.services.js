"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleServices = void 0;
const database_1 = require("../../shared/database");
const createVehiclesIntoDb = async (query, params) => {
    const result = await database_1.pool.query(query, params);
    // console.log(result)
    return result;
};
const getVehiclesFromDb = async (query) => {
    const result = await database_1.pool.query(query);
    console.log(result);
    return result;
};
const getSingleVehicleFromDb = async (query, specificVehicleId) => {
    const result = await database_1.pool.query(query, [specificVehicleId]);
    return result;
};
const updateVehiclesInDb = async (vehicleId, vehicle_name, type, registration_number, daily_rent_price, availability_status) => {
    const existingUser = await database_1.pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId]);
    if (existingUser.rows.length < 1) {
        throw new Error("Vehicle not found");
    }
    const result = await database_1.pool.query(`
    UPDATE vehicles 
    SET 
      vehicle_name = COALESCE($1, vehicle_name),
      type = COALESCE($2, type),
      registration_number = COALESCE($3, registration_number),
      daily_rent_price = COALESCE($4, daily_rent_price),
      availability_status = COALESCE($5, availability_status)
    WHERE id = $6
    RETURNING *
    `, [vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId]);
    return result;
};
const deleteVehiclesFromDb = async (deleteQuery, id) => {
    const existingUser = await database_1.pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
    if (existingUser.rows.length < 1) {
        throw new Error("User Not Found--Cannot be Deleted");
    }
    const result = await database_1.pool.query(deleteQuery, [id]);
    return result.rows[0];
};
exports.VehicleServices = { createVehiclesIntoDb, getSingleVehicleFromDb, getVehiclesFromDb, deleteVehiclesFromDb, updateVehiclesInDb };
//# sourceMappingURL=vehicles.services.js.map