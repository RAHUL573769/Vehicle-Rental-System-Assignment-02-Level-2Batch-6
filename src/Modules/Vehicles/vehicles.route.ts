import express, { Request, Response } from 'express'
import { pool } from '../../shared/database'
import { auth } from '../../middlewares/auth'
import { UserRoles } from '../../types/auth.types'
import { VehicleController } from './vehicles.controllers'


const router = express.Router()
router.post("/v1/vehicles", auth(UserRoles.admin), VehicleController.createVehicles)

router.get("/v1/vehicles", VehicleController.getVehicles)
router.get("/v1/vehicles/:id", VehicleController.getSingleVehicles)
router.put("/v1/vehicles/:vehicleId", auth(UserRoles.admin),);

router.delete("/v1/vehicles/:vehicleId", auth(UserRoles.admin),)


export const VehicleRoute = router
