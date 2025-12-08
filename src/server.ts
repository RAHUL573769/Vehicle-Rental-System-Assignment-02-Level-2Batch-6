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
app.use("/api/v1/auth/", AuthRoute)
app.use("/api/v1/vehicles", VehicleRoute)
app.use("/api/v1/users", UserRoute)

app.use("/api", BookingRoute)



initDb();
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path,
    });
});
app.listen(config.PORT, () => {
    console.log(`Example app listening on port ${config.PORT}`)
})
