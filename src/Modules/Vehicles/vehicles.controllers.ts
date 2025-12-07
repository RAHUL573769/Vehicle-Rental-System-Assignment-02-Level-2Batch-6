import { NextFunction, Response, Request } from "express"

import { VehicleServices } from "./vehicles.services";

const createVehicles = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const {
            vehicle_name,
            type,
            registration_number,
            daily_rent_price,
            availability_status
        } = req.body;
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

        const result = await VehicleServices.createVehiclesIntoDb(query, params)

        res.status(201).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }

};

const getVehicles = () => { }
const getSingleVehicles = () => { }
const updateVehicles = () => { }
const deleteVehicles = () => { }


export const VehicleController = { createVehicles, getSingleVehicles, getVehicles, updateVehicles, deleteVehicles }