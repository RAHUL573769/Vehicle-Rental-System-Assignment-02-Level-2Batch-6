import express from 'express'
import { auth } from '../../middlewares/auth'
import { UserRoles } from '../../types/auth.types'
import { VehicleController } from './vehicles.controllers'


const router = express.Router()


router.get("/", VehicleController.getVehicles)
router.post("/", auth(UserRoles.admin), VehicleController.createVehicles)
router.get("/:id", VehicleController.getSingleVehicles)
router.put("/:vehicleId", auth(UserRoles.admin), VehicleController.updateVehicles);

router.delete("/:vehicleId", auth(UserRoles.admin), VehicleController.deleteVehicles)


export const VehicleRoute = router
