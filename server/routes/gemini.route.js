import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res
      .status(400)
      .json({ error: "prompt is required and must be a string." });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7, // enough variation to get real industry-specific data
        topP: 0.9,
        maxOutputTokens: 1024,
        responseMimeType: "application/json", // tell Gemini to return JSON directly
      },
    });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    return res.json({ text });
  } catch (err) {
    console.error("[Gemini Error]", err.message);
    return res
      .status(500)
      .json({ error: "Gemini API call failed.", detail: err.message });
  }
});

export default router;

