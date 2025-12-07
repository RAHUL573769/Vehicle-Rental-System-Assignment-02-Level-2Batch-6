import express from 'express'

import { UserController } from './user.controller'

const router = express.Router()

router.post("/createUser", UserController.createUser)
router.get("/users", UserController.getUsers)
router.get("/users/:id", UserController.getSpecificUsers)
router.patch("/users/:id", UserController.updateUsers)
router.delete("/users/:id", UserController.deleteVehicles)
export const UserRoute = router