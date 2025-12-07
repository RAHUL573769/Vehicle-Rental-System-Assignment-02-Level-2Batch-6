import { NextFunction, Response, Request } from "express"

import { VehicleServices } from "./vehicles.services";



const createVehicles = async (req: Request, res: Response, _next: NextFunction) => {
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

        res.status(200).json({
            success: true,
            "message": "Vehicle created successfully",
            data: result.rows[0]
        });

    } catch (error: any) {
        res.status(500).json({

            "success": false,
            "message": error.message,
            "errors": error




        });
    }

};

const getVehicles = async (_req: Request, res: Response) => {

    try {
        const query = "select  * from vehicles"
        const result = await VehicleServices.getVehiclesFromDb(query)
        // console.log('Getvehicles', result.rows[0])

        delete result.rows[0].created_at
        delete result.rows[0].updated_at

        res.status(200).json({

            "success": true,
            "message": "Vehicles retrieved successfully",
            "data":
                result.rows


        })

    } catch (error: any) {




        res.status(404).json({

            "success": false,
            "message": "No vehicles found",
            "errors": error.message


        })

    }
}

const getSingleVehicles = async (req: Request, res: Response) => {
    try {
        const specificVehicleId = req.params["id"]
        const query = `Select * from vehicles where id= $1`
        const result = await VehicleServices.getSingleVehicleFromDb(query, specificVehicleId as string)
        res.status(200).json({

            "success": true,
            "message": "Vehicles retrieved successfully",
            "data":
                result.rows


        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            errors: error.message
        });
    }



}




const updateVehicles = async (req: Request, res: Response) => {
    try {
        const id = req.params["vehicleId"];

        const {
            vehicle_name,
            type,
            registration_number,
            daily_rent_price,
            availability_status
        } = req.body;

        const query = `
    UPDATE vehicles
    SET
        vehicle_name = $1,
        type = $2,
        registration_number = $3,
        daily_rent_price = $4,
        availability_status = $5
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
        ]

        const result = await VehicleServices.updateVehiclesInDb(query, params)

        res.status(200).json({

            success: true,
            "message": "Vehicle updated successfully",
            data: result.rows[0]
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            "message": error.message,
            error: error.message
        });
    }
}




const deleteVehicles = async (req: Request, res: Response) => {
    const id = req.params["vehicleId"];
    const deleteQuery = `DELETE FROM vehicles WHERE id=$1 `
    const result = await VehicleServices.deleteVehiclesFromDb(deleteQuery, id as string)
    res.status(200).json({
        result: result
    })
}



export const VehicleController = { createVehicles, getSingleVehicles, getVehicles, updateVehicles, deleteVehicles }