"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleRoute = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("../../shared/database");
const auth_1 = require("../../middlewares/auth");
const auth_types_1 = require("../../types/auth.types");
const router = express_1.default.Router();
router.post("/v1/vehicles", (0, auth_1.auth)(auth_types_1.UserRoles.admin), async (req, res) => {
    // console.log(...req.body)
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
    console.log("Vehicle Data", vehicle_name);
    const query = `INSERT INTO vehicles(vehicle_name ,type ,registration_number,daily_rent_price,availability_status)VALUES ($1,$2,$3,$4,$5)RETURNING * `;
    const result = await database_1.pool.query(query, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    // console.log(result)
    const data = result.rows[0];
    console.log(data);
    res.status(200).json({ data });
});
router.get("/v1/vehicles", async (req, res) => {
    const query = "select  * from vehicles";
    const result = await database_1.pool.query(query);
    console.log(result.rows[0]);
    delete result.rows[0].created_at;
    delete result.rows[0].updated_at;
    const vehicleOutput = {
        "success": true,
        "message": "Vehicle created successfully",
        "data": result.rows
    };
    res.status(200).json(vehicleOutput);
});
router.get("/v1/vehicles/:id", async (req, res) => {
    const specificVehicleId = req.params["id"];
    const query = `Select * from vehicles where id= $1`;
    const result = await database_1.pool.query(query, [specificVehicleId]);
    res.status(200).json({ result });
    //   const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
});
router.put("/v1/vehicles/:vehicleId", (0, auth_1.auth)(auth_types_1.UserRoles.admin), async (req, res) => {
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
        const result = await database_1.pool.query(query, [
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
router.delete("/v1/vehicles/:vehicleId", (0, auth_1.auth)(auth_types_1.UserRoles.admin), async (req, res) => {
    const id = req.params["vehicleId"];
    const deleteQuery = `DELETE FROM vehicles WHERE id=$1 `;
    const result = await database_1.pool.query(deleteQuery, [id]);
    res.status(200).json({
        result: result
    });
});
exports.VehicleRoute = router;
//# sourceMappingURL=vehicles.route.js.map