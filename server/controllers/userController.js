import { User } from "../models/user.js";

export const getUserData = async (req, res) => {
  try {
    // Check if userId is attached by middleware
    const userId = req.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is missing from request" });
    }

    // Fetch user data (only specific fields)
    const user = await User.findById(userId).select("name email isVerified");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Send response
    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
