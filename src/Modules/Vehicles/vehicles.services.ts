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
const updateVehiclesInDb = async (vehicleId?: number | string,
    vehicle_name?: string,
    type?: string,
    registration_number?: string,
    daily_rent_price?: number,
    availability_status?: string) => {
    const existingUser = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId]);
    if (existingUser.rows.length < 1) {
        throw new Error("Vehicle not found");
    }

    const result = await pool.query(
        `
    UPDATE vehicles 
    SET 
      vehicle_name = COALESCE($1, vehicle_name),
      type = COALESCE($2, type),
      registration_number = COALESCE($3, registration_number),
      daily_rent_price = COALESCE($4, daily_rent_price),
      availability_status = COALESCE($5, availability_status)
    WHERE id = $6
    RETURNING *
    `,
        [vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId]
    );

    return result

}
const deleteVehiclesFromDb = async (deleteQuery: string, id: string) => {

    const existingUser = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
    if (existingUser.rows.length < 1) {
        throw new Error("User Not Found--Cannot be Deleted");
    }

    const result = await pool.query(deleteQuery, [id])
    return result.rows[0]
}



export const VehicleServices = { createVehiclesIntoDb, getSingleVehicleFromDb, getVehiclesFromDb, deleteVehiclesFromDb, updateVehiclesInDb }