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
const updateVehiclesInDb = async (query, params) => {
    const result = await database_1.pool.query(query, params);
    return result;
};
const deleteVehiclesFromDb = async (deleteQuery, id) => {
    const result = await database_1.pool.query(deleteQuery, [id]);
    return result;
};
exports.VehicleServices = { createVehiclesIntoDb, getSingleVehicleFromDb, getVehiclesFromDb, deleteVehiclesFromDb, updateVehiclesInDb };
//# sourceMappingURL=vehicles.services.js.map