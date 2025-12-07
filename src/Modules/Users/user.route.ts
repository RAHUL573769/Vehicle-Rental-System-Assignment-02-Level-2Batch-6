import express from 'express'
const router = express.Router()
import { UserController } from './user.controller'



router.post("/createUser", UserController.createUser)
router.get("/users", UserController.getUsers)
router.get("/users/:id", UserController.getSpecificUsers)
router.patch("/users/:id", UserController.updateUsers)
router.delete("/users/:id", UserController.deleteVehicles)
export const UserRoute = router