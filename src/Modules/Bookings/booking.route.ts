import express from 'express'
import { BookingsController } from './bookings.controller'
const router = express.Router()
router.post("/v1/bookings", BookingsController.createBookings)

export const BookingRoute = router