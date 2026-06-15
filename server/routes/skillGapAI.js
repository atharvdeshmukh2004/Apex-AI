

import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// ── Gemini setup ───────────────────────────────────────────────────────────
if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️  GEMINI_API_KEY not found in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function callGemini(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
  const result = await model.generateContent(prompt);
  const text = result?.response?.text();
  if (!text) throw new Error("Empty response from Gemini");
  // Strip markdown code fences if present
  return text.replace(/```json|```/gi, "").trim();
}

// ── helper: safe JSON parse ────────────────────────────────────────────────
function safeJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    // Sometimes Gemini wraps in an object — try extracting array
    const match = text.match(/\[[\s\S]*\]/);
    if (match) return JSON.parse(match[0]);
    const matchObj = text.match(/\{[\s\S]*\}/);
    if (matchObj) return JSON.parse(matchObj[0]);
    return null;
  }
}

// ══════════════════════════════════════════════════════════════════════════
// POST /api/skill-gap/get-skills
// Body: { career, currentRole?, education?, experience?, context? }
// Returns: { skills: [{skill, requiredLevel, category, description}] }
// ══════════════════════════════════════════════════════════════════════════
router.post("/skill-gap/get-skills", async (req, res) => {
  try {
    const { career, currentRole, education, experience, context } = req.body;

    if (!career?.trim()) {
      return res.status(400).json({ error: "career is required" });
    }

    const prompt = `
You are a senior hiring manager with deep expertise in "${career}".

Candidate background:
- Current role: ${currentRole || "Not specified"}
- Education: ${education || "Not specified"}
- Experience: ${experience || "Not specified"}
- Extra context: ${context || "None"}

TASK:
Generate the most important skills needed to succeed as a "${career}".
The skills must be SPECIFIC to this exact role — NOT generic (no "communication" or "teamwork").
Consider the candidate's background and tailor the skill list to their transition.
Decide how many skills are needed (between 6 and 12) based on complexity of the role.

Return ONLY a valid JSON array. No explanation, no markdown:
[
  {
    "skill": "exact skill name (e.g. PyTorch, React Hooks, SQL Window Functions)",
    "requiredLevel": <integer 1-10>,
    "category": "technical | tool | domain | soft",
    "description": "one sentence — why this skill matters for ${career}"
  }
]`;

    let skills = [];

    try {
      const text = await callGemini(prompt);
      const parsed = safeJSON(text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        skills = parsed;
      }
    } catch (err) {
      console.warn("⚠️ Gemini skill fetch failed:", err.message);
    }

    // Fallback if Gemini fails
    if (skills.length === 0) {
      skills = [
        {
          skill: `${career} Core Concepts`,
          requiredLevel: 7,
          category: "domain",
          description: `Fundamental knowledge required for ${career}`,
        },
        {
          skill: `${career} Tools & Workflow`,
          requiredLevel: 6,
          category: "tool",
          description: `Standard tools used by professionals in ${career}`,
        },
        {
          skill: `${career} Problem Solving`,
          requiredLevel: 7,
          category: "technical",
          description: `Applying skills to real ${career} challenges`,
        },
        {
          skill: `${career} Best Practices`,
          requiredLevel: 6,
          category: "domain",
          description: `Industry standards and patterns in ${career}`,
        },
      ];
    }

    return res.json({ skills });
  } catch (err) {
    console.error("🔥 /get-skills error:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch skills", detail: err.message });
  }
});

// ══════════════════════════════════════════════════════════════════════════
// POST /api/skill-gap/analyze-gap
// Body: { career, currentRole?, skills, userSkills, experience? }
//   skills     — array from /get-skills
//   userSkills — { "skill name": <0-10>, ... }
// Returns: full gap analysis object
// ══════════════════════════════════════════════════════════════════════════
router.post("/skill-gap/analyze-gap", async (req, res) => {
  try {
    const { career, currentRole, skills, userSkills, experience } = req.body;

    if (!career || !skills || !userSkills) {
      return res
        .status(400)
        .json({ error: "career, skills, and userSkills are required" });
    }

    const requiredList = skills
      .map(
        (s) => `- ${s.skill}: required ${s.requiredLevel}/10 (${s.category})`,
      )
      .join("\n");

    const userList = Object.entries(userSkills)
      .map(([skill, level]) => `- ${skill}: ${level}/10`)
      .join("\n");

    const prompt = `
You are an expert career coach helping someone transition into "${career}".

Candidate:
- Current role: ${currentRole || "Not specified"}
- Experience: ${experience || "Not specified"}

Required skills for ${career}:
${requiredList}

Candidate's self-rated skills:
${userList}

TASK:
Perform a deep, personalized skill gap analysis.
Be honest — don't sugarcoat gaps. Be specific to THIS person's transition.

Return ONLY valid JSON. No markdown. No explanation:
{
  "headline": "one honest sentence summarizing their readiness (under 14 words)",
  "readinessPct": <0-100>,
  "timelineMonths": <realistic months to be job-ready, 1-36>,
  "summary": "3 sentences: honest personalized assessment of their situation",
  "strengths": [
    { "skill": "skill name", "detail": "why this helps their transition" }
  ],
  "analysis": [
    {
      "skill": "skill name",
      "current": <0-10>,
      "required": <0-10>,
      "gap": <required minus current>,
      "level": "Low | Medium | High",
      "reason": "why this gap matters for ${career}",
      "action": "specific step to close this gap"
    }
  ],
  "priority": ["top skill to fix first", "second", "third"],
  "milestones": [
    {
      "timeframe": "e.g. Week 1-2",
      "goal": "specific goal",
      "actions": ["action 1", "action 2"]
    }
  ],
  "resources": [
    { "skill": "skill name", "resource": "specific course, book, or platform" }
  ]
}`;

    let data = null;

    try {
      const text = await callGemini(prompt);
      data = safeJSON(text);
    } catch (err) {
      console.warn("⚠️ Gemini analysis failed:", err.message);
    }

    // Intelligent fallback — still useful without Gemini
    if (!data || !data.analysis) {
      const analysis = skills.map((s) => {
        const current = userSkills[s.skill] ?? 0;
        const required = s.requiredLevel;
        const gap = Math.max(0, required - current);
        return {
          skill: s.skill,
          current,
          required,
          gap,
          level: gap >= 6 ? "High" : gap >= 3 ? "Medium" : "Low",
          reason: `${s.description || `Important for ${career}`}`,
          action: `Study and practice ${s.skill} through real projects`,
        };
      });

      const sorted = [...analysis].sort((a, b) => b.gap - a.gap);
      const readinessPct = Math.round(
        (skills.reduce(
          (acc, s) => acc + Math.min(userSkills[s.skill] ?? 0, s.requiredLevel),
          0,
        ) /
          skills.reduce((acc, s) => acc + s.requiredLevel, 0)) *
          100,
      );

      data = {
        headline: `You are ${readinessPct}% ready for ${career} — gaps identified below`,
        readinessPct,
        timelineMonths: Math.max(1, Math.round(sorted[0]?.gap * 1.5) || 3),
        summary: `Analysis complete for your transition to ${career}. Focus on the high-gap skills first.`,
        strengths: analysis
          .filter((a) => a.gap === 0)
          .map((a) => ({
            skill: a.skill,
            detail: "Already at required level",
          })),
        analysis,
        priority: sorted.slice(0, 3).map((a) => a.skill),
        milestones: [
          {
            timeframe: "Week 1-2",
            goal: `Learn ${sorted[0]?.skill || "top skill"}`,
            actions: ["Find a course", "Complete beginner exercises"],
          },
          {
            timeframe: "Month 1",
            goal: "Build a small project using new skills",
            actions: ["Apply learned skills", "Share on GitHub"],
          },
          {
            timeframe: "Month 2-3",
            goal: "Reach job-ready level",
            actions: ["Apply to roles", "Practice interviews"],
          },
        ],
        resources: sorted
          .slice(0, 3)
          .map((a) => ({
            skill: a.skill,
            resource: `Search "${a.skill} course" on Coursera or Udemy`,
          })),
      };
    }

    return res.json(data);
  } catch (err) {
    console.error("🔥 /analyze-gap error:", err);
    return res
      .status(500)
      .json({ error: "Failed to analyze gap", detail: err.message });
  }
});

export default router;