

import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ── POST /api/roadmap/generate ────────────────────────────────────────────────
router.post("/generate", async (req, res) => {
  console.log("Request body:", JSON.stringify(req.body)); // ← debug log

  try {
    const { studentProfile, careerCluster } = req.body;

    if (!careerCluster)
      return res.status(400).json({ error: "careerCluster is required" });
    if (!studentProfile)
      return res.status(400).json({ error: "studentProfile is required" });
    if (!process.env.GEMINI_API_KEY)
      return res.status(500).json({ error: "GEMINI_API_KEY not set in .env" });

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = buildPrompt(studentProfile, careerCluster);

    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    // Strip markdown fences if Gemini wraps in ```json ... ```
    const clean = raw.replace(/```json|```/g, "").trim();

    let roadmap;
    try {
      roadmap = JSON.parse(clean);
    } catch {
      console.error("Gemini returned non-JSON:", clean.slice(0, 300));
      return res
        .status(500)
        .json({ error: "Failed to parse roadmap from Gemini" });
    }

    res.json({ roadmap });
  } catch (err) {
    console.error("[/api/roadmap/generate]", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── Prompt builder ────────────────────────────────────────────────────────────
function buildPrompt(student, cluster) {
  return `You are an expert career counselor for Indian students. Generate a detailed, actionable career roadmap.

Student Profile:
- Name: ${student.name || "Student"}
- Education: ${student.education_level} — ${student.stream}
- Score: ${student.percentage_score}%
- Interests: ${(student.top_interests || []).join(", ")}
- Technical Skills: ${(student.technical_skills || []).join(", ")}
- Soft Skills: communication=${student.soft_skills?.communication}, leadership=${student.soft_skills?.leadership}, analytical=${student.soft_skills?.analytical}, creative=${student.soft_skills?.creative}
- Learning Style: ${student.learning_style}
- Work Preference: ${student.work_preference}
- Risk Appetite: ${student.risk_appetite}
- Location Preference: ${student.location_preference}
- Aspirations: ${student.aspirations || "Not specified"}
- Career Target: ${cluster}

Return ONLY valid JSON with no markdown, no backticks, no extra text. Use this exact structure:
{
  "careerTitle": "${cluster} — Personalized Roadmap",
  "summary": "2-sentence personalized summary mentioning the student background",
  "totalDuration": "18-24 months",
  "difficulty": "Beginner/Moderate/Advanced",
  "phases": [
    {
      "title": "Phase title",
      "duration": "Month 1-4",
      "description": "2-3 sentences tailored to this student",
      "skills": ["skill1", "skill2", "skill3", "skill4"],
      "resources": [
        { "name": "Resource name", "platform": "Platform name", "free": true }
      ],
      "milestones": ["milestone1", "milestone2"],
      "projects": ["project1", "project2"]
    }
  ],
  "careerPaths": [
    { "role": "Job Role", "salary": "₹X-Y LPA", "companies": ["Co1", "Co2", "Co3"], "growth": "Growth path description" }
  ],
  "exams": [
    { "name": "Exam name", "forWhat": "What it is for", "difficulty": "Easy/Medium/Hard" }
  ],
  "colleges": [
    { "name": "College name", "loc": "City", "prog": "Program name", "rank": "Rank info" }
  ],
  "tips": ["tip1", "tip2", "tip3", "tip4", "tip5"],
  "mistakes": ["mistake1", "mistake2", "mistake3"]
}

Generate exactly 4 phases. Make everything India-specific, practical and actionable. Return JSON only.`;
}

export default router;
