import express from 'express'
import { HelloWorldRouter } from './Modules/HelloWorld/HelloWorld.route'
import config from './config'

import { initDb } from './shared/database'
import { UserRoute } from './Modules/Users/user.route'
import { AuthRoute } from './Modules/Auth/auth.route'
import { VehicleRoute } from './Modules/Vehicles/vehicles.route'
import { BookingRoute } from './Modules/Bookings/booking.route'
const app = express()
app.use(express.json())
app.use("/", HelloWorldRouter)
app.use("/users", UserRoute)
app.use("/api", VehicleRoute)
app.use("/api", BookingRoute)
app.use("/auth", AuthRoute)
initDb();

app.listen(config.PORT, () => {
    console.log(`Example app listening on port ${config.PORT}`)
})
