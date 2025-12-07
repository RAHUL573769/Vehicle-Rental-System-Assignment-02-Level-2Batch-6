import express, { Request, Response } from 'express'
import { pool } from '../../shared/database'
import { auth } from '../../middlewares/auth'


const router = express.Router()
router.post("/v1/vehicles", auth("customer"), async (req: Request, res: Response) => {
    // console.log(...req.body)
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body
    console.log("Vehicle Data", vehicle_name)

    const query = `INSERT INTO vehicles(vehicle_name ,type ,registration_number,daily_rent_price,availability_status)VALUES ($1,$2,$3,$4,$5)RETURNING * `
    const result = await pool.query(query, [vehicle_name, type, registration_number, daily_rent_price, availability_status])
    // console.log(result)
    const data = result.rows[0]

    console.log(data)
    res.status(200).json({ data })


})

router.get("/v1/vehicles", async (req: Request, res: Response) => {

    const query = "select  * from vehicles"
    const result = await pool.query(query)
    console.log(result.rows[0])

    delete result.rows[0].created_at
    delete result.rows[0].updated_at
    const vehicleOutput = {

        "success": true,
        "message": "Vehicle created successfully",
        "data":
            result.rows


    }
    res.status(200).json(vehicleOutput)
})
router.get("/v1/vehicles/:id", async (req: Request, res: Response) => {
    const specificVehicleId = req.params["id"]
    const query = `Select * from vehicles where id= $1`
    const result = await pool.query(query, [specificVehicleId])
    res.status(200).json({ result })

    //   const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

})
router.put("/v1/vehicles/:vehicleId", async (req: Request, res: Response) => {
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
                availability_status = $5,
                updated_at = NOW()
            WHERE id = $6
            RETURNING *;
        `;

        const result = await pool.query(query, [
            vehicle_name,
            type,
            registration_number,
            daily_rent_price,
            availability_status,
            id
        ]);

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

router.delete("/v1/vehicles/:vehicleId", async (req: Request, res: Response) => {
    const id = req.params["vehicleId"];
    const deleteQuery = `DELETE FROM vehicles WHERE id=$1 `
    const result = await pool.query(deleteQuery, [id])
    res.status(200).json({
        result: result
    })
})


export const VehicleRoute = router
