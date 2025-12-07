"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleController = void 0;
const vehicles_services_1 = require("./vehicles.services");
const createVehicles = async (req, res, _next) => {
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
const getVehicles = async (_req, res) => {
    try {
        const query = "select  * from vehicles";
        const result = await vehicles_services_1.VehicleServices.getVehiclesFromDb(query);
        console.log('Getvehicles', result.rows[0]);
        delete result.rows[0].created_at;
        delete result.rows[0].updated_at;
        res.status(200).json({
            "success": true,
            "message": "Vehicles retrieved successfully",
            "data": result.rows
        });
    }
    catch (error) {
        res.status(404).json({
            "success": false,
            "message": "Error description",
            "errors": error.message
        });
    }
};
const getSingleVehicles = async (req, res) => {
    const specificVehicleId = req.params["id"];
    const query = `Select * from vehicles where id= $1`;
    const result = await vehicles_services_1.VehicleServices.getSingleVehicleFromDb(query, specificVehicleId);
    res.status(200).json({
        "success": true,
        "message": "Vehicles retrieved successfully",
        "data": result.rows
    });
};
const updateVehicles = async (req, res) => {
    try {
        const id = req.params["vehicleId"];
        const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
        const query = `
            UPDATE vehicles 
            SET 
                vehicle_name = $1,
                type = $2,
                registration_number = $3,
                daily_rent_price = $4,
                availability_status = $5,
                updated_at = NOW()
            WHERE id = $6
            RETURNING *;
        `;
        const params = [
            vehicle_name,
            type,
            registration_number,
            daily_rent_price,
            availability_status,
            id
        ];
        const result = await vehicles_services_1.VehicleServices.updateVehiclesInDb(query, params);
        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
const deleteVehicles = async (req, res) => {
    const id = req.params["vehicleId"];
    const deleteQuery = `DELETE FROM vehicles WHERE id=$1 `;
    const result = await vehicles_services_1.VehicleServices.deleteVehiclesFromDb(deleteQuery, id);
    res.status(200).json({
        result: result
    });
};
exports.VehicleController = { createVehicles, getSingleVehicles, getVehicles, updateVehicles, deleteVehicles };
//# sourceMappingURL=vehicles.controllers.js.map