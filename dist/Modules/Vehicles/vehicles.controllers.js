"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleController = void 0;
const vehicles_services_1 = require("./vehicles.services");
const createVehicles = async (req, res, next) => {
    try {
        const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
        const query = `
            INSERT INTO vehicles (
                vehicle_name,
                type,
                registration_number,
                daily_rent_price,
                availability_status
            ) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const params = [
            vehicle_name,
            type,
            registration_number,
            daily_rent_price,
            availability_status
        ];
        const result = await vehicles_services_1.VehicleServices.createVehiclesIntoDb(query, params);
        res.status(201).json({
            success: true,
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
const getVehicles = () => { };
const getSingleVehicles = () => { };
const updateVehicles = () => { };
const deleteVehicles = () => { };
exports.VehicleController = { createVehicles, getSingleVehicles, getVehicles, updateVehicles, deleteVehicles };
//# sourceMappingURL=vehicles.controllers.js.map