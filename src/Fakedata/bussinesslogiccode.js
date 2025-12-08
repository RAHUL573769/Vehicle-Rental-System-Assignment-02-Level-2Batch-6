// controllers/deleteUser.ts
import Booking from "../models/Booking";
import User from "../models/User";

export const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;

        const activeBookings = await Booking.find({
            customer_id: user_id,
            status: "active"
        });

        if (activeBookings.length > 0) {
            return res.status(400).json({
                message: "User cannot be deleted because they have active bookings"
            });
        }

        await User.findByIdAndDelete(user_id);

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
