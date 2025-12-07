"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleServices = void 0;
const database_1 = require("../../shared/database");
const createVehiclesIntoDb = async (query, params) => {
    const result = await database_1.pool.query(query, params);
    console.log(result);
    return result;
};
const getVehiclesFromDb = async () => { };
const getSingleVehicleFromDb = async () => { };
const updateVehiclesInDb = async () => { };
const deleteVehiclesFrom = async () => { };
exports.VehicleServices = { createVehiclesIntoDb, getSingleVehicleFromDb, getVehiclesFromDb, deleteVehiclesFrom, updateVehiclesInDb };
//# sourceMappingURL=vehicles.services.js.map