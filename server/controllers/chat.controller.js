// import { generateAIResponse } from "../routes/chat.service.js";

// export const handleChat = async (req, res) => {
//   try {
//     const { message, history } = req.body;

//     const userProfile = {
//       education: req.user?.education || "unknown",
//       interests: req.user?.interests || [],
//     };

//     const reply = await generateAIResponse(message, userProfile, history || []);

//     res.json({ reply });
//   } catch (err) {
//     res.status(500).json({
//       message: err.message || "Chat error",
//     });
//   }
// };
