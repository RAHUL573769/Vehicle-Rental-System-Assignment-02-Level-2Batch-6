"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
// controllers/deleteUser.ts
const Booking_1 = __importDefault(require("../models/Booking"));
const User_1 = __importDefault(require("../models/User"));
const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const activeBookings = await Booking_1.default.find({
            customer_id: user_id,
            status: "active"
        });
        if (activeBookings.length > 0) {
            return res.status(400).json({
                message: "User cannot be deleted because they have active bookings"
            });
        }
        await User_1.default.findByIdAndDelete(user_id);
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=bussinesslogiccode.js.map