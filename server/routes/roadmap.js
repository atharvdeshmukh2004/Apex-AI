import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generate", async (req, res) => {
  try {
    const { field } = req.body;
    if (!field)
      return res
        .status(400)
        .json({ success: false, message: "Field required" });

    // Use getGenerativeModel for Gemini 2.0
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Generate a structured learning roadmap for ${field}.
      Return strictly as JSON array like:
      [
        {"id":"1","title":"Step 1","description":"Short explanation","next":"2"},
        {"id":"2","title":"Step 2","description":"Short explanation","next":"3"}
      ]
    `.trim();

    const result = await model.generateContent(prompt);
    const text = result.response.text(); // safe method to get text

    // Safe JSON parse
    let roadmap = [];
    try {
      const jsonString = text.match(/\[.*\]/s);
      if (jsonString) roadmap = JSON.parse(jsonString[0]);
      else throw new Error("No JSON returned from AI");
    } catch (err) {
      console.error("JSON parse error:", err, "AI text:", text);
      return res
        .status(500)
        .json({ success: false, message: "Failed to parse roadmap JSON" });
    }

    res.json({ success: true, roadmap });
  } catch (err) {
    console.error("Roadmap generation error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
