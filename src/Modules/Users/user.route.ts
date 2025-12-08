import express from 'express'
const router = express.Router()
import { UserController } from './user.controller'
import { auth } from '../../middlewares/auth'
import { UserRoles } from '../../types/auth.types'


router.get("/", UserController.getUsers)
// router.post("/", auth("admin"), UserController.createUser)

router.get("/:id", UserController.getSpecificUsers)


router.put('/:userId', auth(UserRoles.admin), UserController.AdminOrOwnProfile)

router.delete("/:id", auth(UserRoles.admin), UserController.deleteVehicles)
export const UserRoute = router