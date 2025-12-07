import { pool } from "../../shared/database";

const createVehiclesIntoDb = async (query: string, params: any[]) => {
    const result = await pool.query(query, params);
    console.log(result)
    return result
};
const getVehiclesFromDb = async () => { }
const getSingleVehicleFromDb = async () => { }
const updateVehiclesInDb = async () => { }
const deleteVehiclesFrom = async () => { }



export const VehicleServices = { createVehiclesIntoDb, getSingleVehicleFromDb, getVehiclesFromDb, deleteVehiclesFrom, updateVehiclesInDb }