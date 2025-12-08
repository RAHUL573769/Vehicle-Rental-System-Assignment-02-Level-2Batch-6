import express from 'express'
import { BookingsController } from './bookings.controller'
import { auth } from '../../middlewares/auth'
import { UserRoles } from '../../types/auth.types'
const router = express.Router()
router.post("/v1/bookings", auth(UserRoles.admin, UserRoles.customer), BookingsController.createBookings)

export const BookingRoute = router