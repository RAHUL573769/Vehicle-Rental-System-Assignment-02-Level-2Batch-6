import express from 'express'
import { auth } from '../../middlewares/auth'
import { UserRoles } from '../../types/auth.types'
import { VehicleController } from './vehicles.controllers'


const router = express.Router()
router.post("/v1/vehicles", auth(UserRoles.admin), VehicleController.createVehicles)

router.get("/v1/vehicles", VehicleController.getVehicles)
router.get("/v1/vehicles/:id", VehicleController.getSingleVehicles)
router.put("/v1/vehicles/:vehicleId", auth(UserRoles.admin), VehicleController.updateVehicles);

router.delete("/v1/vehicles/:vehicleId", auth(UserRoles.admin), VehicleController.deleteVehicles)


export const VehicleRoute = router
