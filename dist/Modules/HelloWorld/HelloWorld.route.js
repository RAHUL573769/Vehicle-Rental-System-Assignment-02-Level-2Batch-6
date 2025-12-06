"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloWorldRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello World",
        path: req.path
    });
});
exports.HelloWorldRouter = router;
//# sourceMappingURL=HelloWorld.route.js.map