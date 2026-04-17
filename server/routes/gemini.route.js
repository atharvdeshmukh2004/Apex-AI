// // backend/routes/gemini.js
// // Express route — drop this into your existing Express/Node backend.
// // Requires: npm install @google/generative-ai

// const express = require("express");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const router = express.Router();
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// /**
//  * POST /api/gemini
//  * Body: { prompt: string }
//  * Returns: { text: string }
//  */
// router.post("/", async (req, res) => {
//   const { prompt } = req.body;

//   if (!prompt || typeof prompt !== "string") {
//     return res
//       .status(400)
//       .json({ error: "prompt is required and must be a string." });
//   }

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent(prompt);
//     const text = result.response.text();
//     return res.json({ text });
//   } catch (err) {
//     console.error("[Gemini Error]", err.message);
//     return res
//       .status(500)
//       .json({ error: "Gemini API call failed.", detail: err.message });
//   }
// });

// module.exports = router;

// // ---------------------------------------------------------------------------
// // How to register in your main Express app (app.js / server.js):
// //
// //   const geminiRoute = require("./routes/gemini");
// //   app.use("/api/gemini", geminiRoute);
// //
// // .env:
// //   GEMINI_API_KEY=your_key_here
// //
// // Install dep:
// //   npm install @google/generative-ai
// // ---------------------------------------------------------------------------

import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * POST /api/gemini
 * Body: { prompt: string }
 * Returns: { text: string }
 */
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        error: "prompt is required and must be a string.",
      });
    }

    // ✅ FIX: Use correct model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    if (!result?.response) {
      throw new Error("No response from Gemini");
    }

    const text = result.response.text();

    return res.json({ text });
  } catch (err) {
    console.error("🔥 Gemini FULL ERROR:", err);
    return res.status(500).json({
      error: "Gemini API call failed",
      detail: err.message,
    });
  }
});

export default router;