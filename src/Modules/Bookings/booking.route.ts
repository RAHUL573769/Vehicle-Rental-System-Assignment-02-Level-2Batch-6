import express from 'express'
import { BookingsController } from './bookings.controller'
import { auth } from '../../middlewares/auth'
import { UserRoles } from '../../types/auth.types'
const router = express.Router()
router.post("/", auth(UserRoles.admin, UserRoles.customer), BookingsController.createBookings)
router.get('/', auth("admin", "customer"), BookingsController.adminAndUserView);
router.put('/:bookingId', auth("admin", "customer"), BookingsController.updateBookingById);
export const BookingRoute = router