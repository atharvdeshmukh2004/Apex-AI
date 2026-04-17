// import User from "../models/user.js";

// export const checkChatLimit = async (req, res, next) => {
//   const user = await User.findById(req.user.id);

//   const today = new Date().toDateString();

//   // Reset daily usage
//   if (user.lastResetDate !== today) {
//     user.questionsUsedToday = 0;
//     user.lastResetDate = today;
//   }

//   // Limit check
//   if (user.plan === "free" && user.questionsUsedToday >= 10) {
//     return res.status(403).json({
//       message: "Daily free limit reached",
//       upgrade: true,
//     });
//   }

//   user.questionsUsedToday += 1;
//   await user.save();

//   req.remaining = 10 - user.questionsUsedToday;

//   next();
// };
