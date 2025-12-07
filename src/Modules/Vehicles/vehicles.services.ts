import { pool } from "../../shared/database";

const createVehiclesIntoDb = async (query: string, params: any[]) => {
    const result = await pool.query(query, params);
    // console.log(result)
    return result
};
const getVehiclesFromDb = async (query: string) => {


    const result = await pool.query(query)
    console.log(result)
    return result
}
const getSingleVehicleFromDb = async (query: string, specificVehicleId: string) => {


    const result = await pool.query(query, [specificVehicleId])
    return result
}
const updateVehiclesInDb = async (query: string, params: any[]) => {

    const result = await pool.query(query, params);
    return result

}
const deleteVehiclesFromDb = async (deleteQuery: string, id: string) => {
    const result = await pool.query(deleteQuery, [id])
    return result
}



export const VehicleServices = { createVehiclesIntoDb, getSingleVehicleFromDb, getVehiclesFromDb, deleteVehiclesFromDb, updateVehiclesInDb }