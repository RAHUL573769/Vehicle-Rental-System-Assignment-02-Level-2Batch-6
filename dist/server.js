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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", HelloWorld_route_1.HelloWorldRouter);
app.use("/users", user_route_1.UserRoute);
(0, database_1.initDb)();
app.listen(config_1.default.PORT, () => {
    console.log(`Example app listening on port ${config_1.default.PORT}`);
});
//# sourceMappingURL=server.js.map