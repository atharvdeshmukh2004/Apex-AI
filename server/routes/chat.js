import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import rateLimit from "express-rate-limit";

const router = express.Router();



// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt
const SYSTEM_PROMPT = `You are a focused Academic and Career Assistant for students.
You ONLY answer questions related to academics and career.
If not related, respond with:
{"blocked":true,"reason":"I can only help with academic and career questions."}
Keep answers short and helpful.`;

// Route
router.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        ...(Array.isArray(history) ? history : []).map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
      ],
    });

    const result = await chat.sendMessage(message.trim());
    const rawReply = result.response.text();

    res.json({ reply: rawReply, blocked: false });
  } catch (err) {
    console.error("🔥 FULL ERROR:", err);
    res.status(500).json({
      error: "Failed to get a response. Please try again.",
    });
  }
});

export default router;
