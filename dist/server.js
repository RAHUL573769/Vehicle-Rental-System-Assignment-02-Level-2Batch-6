"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HelloWorld_route_1 = require("./Modules/HelloWorld/HelloWorld.route");
const config_1 = __importDefault(require("./config"));
const database_1 = require("./shared/database");
const user_route_1 = require("./Modules/Users/user.route");
const auth_route_1 = require("./Modules/Auth/auth.route");
const vehicles_route_1 = require("./Modules/Vehicles/vehicles.route");
const booking_route_1 = require("./Modules/Bookings/booking.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", HelloWorld_route_1.HelloWorldRouter);
app.use("/api/v1/auth/", auth_route_1.AuthRoute);
app.use("/api/v1/vehicles", vehicles_route_1.VehicleRoute);
app.use("/users", user_route_1.UserRoute);
app.use("/api", booking_route_1.BookingRoute);
(0, database_1.initDb)();
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path,
    });
});
app.listen(config_1.default.PORT, () => {
    console.log(`Example app listening on port ${config_1.default.PORT}`);
});
//# sourceMappingURL=server.js.map