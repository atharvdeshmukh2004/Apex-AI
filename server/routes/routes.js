/**
 * routes/match.js — Run ML matching
 */
const express = require("express");
const { careerML } = require("../ml/randomForest");
const { db } = require("../models/postgres");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// POST /api/match
// Body: student profile object
router.post("/", authenticate, async (req, res, next) => {
  try {
    const profile = req.body;
    if (!profile.education_level)
      return res.status(400).json({ error: "education_level required" });

    // Save/update profile first
    await db.upsertProfile(req.studentId, {
      education_level: profile.education_level,
      stream: profile.stream,
      percentage_score: profile.percentage_score,
      board_or_university: profile.board_or_university,
      top_interests: profile.top_interests,
      technical_skills: profile.technical_skills,
      skill_communication: profile.soft_skills?.communication ?? 3,
      skill_leadership: profile.soft_skills?.leadership ?? 3,
      skill_teamwork: profile.soft_skills?.teamwork ?? 3,
      skill_analytical: profile.soft_skills?.analytical ?? 3,
      skill_creative: profile.soft_skills?.creative ?? 3,
      learning_style: profile.learning_style,
      work_preference: profile.work_preference,
      risk_appetite: profile.risk_appetite,
      location_preference: profile.location_preference,
      aspirations: profile.aspirations,
    });

    // Run RF prediction
    const result = await careerML.predict(profile);

    // Persist match result
    const matchRow = await db.saveMatch(req.studentId, result);

    res.json({
      matchId: matchRow.rows[0].id,
      ...result,
    });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/match/:matchId/select
router.patch("/:matchId/select", authenticate, async (req, res, next) => {
  try {
    const { cluster } = req.body;
    const updated = await db.updateSelectedCluster(req.params.matchId, cluster);
    res.json(updated.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

/**
 * routes/roadmap.js — Generate + retrieve roadmaps
 */
// (This would be in its own file — combined here for brevity)
const roadmapRouter = express.Router();
const Anthropic = require("@anthropic-ai/sdk");
const { Roadmap } = require("../models/mongo");
const { authenticateRoadmap } = require("../middleware/auth");

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// POST /api/roadmap/generate
roadmapRouter.post("/generate", authenticate, async (req, res, next) => {
  try {
    const { studentProfile, careerCluster, matchId } = req.body;
    if (!careerCluster)
      return res.status(400).json({ error: "careerCluster required" });

    const prompt = buildRoadmapPrompt(studentProfile, careerCluster);

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content.map((b) => b.text || "").join("");
    const clean = text.replace(/```json|```/g, "").trim();
    const roadmapData = JSON.parse(clean);

    // Save to MongoDB
    const roadmap = await Roadmap.create({
      studentId: req.studentId,
      matchId,
      careerCluster,
      ...roadmapData,
    });

    // Update selected cluster on match
    if (matchId) await db.updateSelectedCluster(matchId, careerCluster);

    res.status(201).json({ roadmapId: roadmap._id, roadmap: roadmapData });
  } catch (err) {
    next(err);
  }
});

// GET /api/roadmap/:roadmapId
roadmapRouter.get("/:roadmapId", authenticate, async (req, res, next) => {
  try {
    const roadmap = await Roadmap.findById(req.params.roadmapId);
    if (!roadmap) return res.status(404).json({ error: "Roadmap not found" });
    await Roadmap.findByIdAndUpdate(req.params.roadmapId, {
      $inc: { viewCount: 1 },
      lastViewedAt: new Date(),
    });
    res.json(roadmap);
  } catch (err) {
    next(err);
  }
});

// GET /api/roadmap/student/me  — latest roadmap for current student
roadmapRouter.get("/student/me", authenticate, async (req, res, next) => {
  try {
    const roadmaps = await Roadmap.find({ studentId: req.studentId }).sort(
      "-createdAt",
    );
    res.json(roadmaps);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/roadmap/:roadmapId/progress
roadmapRouter.patch(
  "/:roadmapId/progress",
  authenticate,
  async (req, res, next) => {
    try {
      const { phaseIndex, phaseTitle, status, completion_pct, notes } =
        req.body;
      const progress = await db.upsertProgress(
        req.studentId,
        req.params.roadmapId,
        phaseIndex,
        {
          phase_title: phaseTitle,
          status,
          completion_pct,
          notes,
        },
      );
      res.json(progress.rows[0]);
    } catch (err) {
      next(err);
    }
  },
);

function buildRoadmapPrompt(student, cluster) {
  return `You are an expert career counselor for Indian students. Generate a highly detailed, actionable career roadmap.

Student Profile:
- Name: ${student?.name || "Student"}
- Education: ${student?.education_level} — ${student?.stream}
- Score: ${student?.percentage_score}%
- Interests: ${(student?.top_interests || []).join(", ")}
- Technical Skills: ${(student?.technical_skills || []).join(", ")}
- Learning Style: ${student?.learning_style}
- Work Preference: ${student?.work_preference}
- Risk Appetite: ${student?.risk_appetite}
- Location Preference: ${student?.location_preference}
- Aspirations: ${student?.aspirations || "Not specified"}
- Career Target: ${cluster}

Return ONLY valid JSON (no markdown, no backticks) matching this exact structure:
{
  "careerTitle": "${cluster} — Personalized Roadmap",
  "summary": "2-sentence personalized summary",
  "totalDuration": "e.g. 18-24 months",
  "difficulty": "Beginner/Moderate/Advanced",
  "phases": [
    {
      "title": "Phase title",
      "duration": "Month X-Y",
      "description": "2-3 sentences tailored to this student",
      "skills": ["skill1","skill2","skill3","skill4"],
      "resources": [{"name":"Resource","platform":"Platform","url":"","isFree":true,"type":"course"}],
      "milestones": ["milestone1","milestone2"],
      "projects": ["project1","project2"]
    }
  ],
  "careerPaths": [{"role":"Role","salaryRange":"₹X-Y LPA","companies":["co1","co2"],"growth":"path"}],
  "entranceExams": [{"name":"Exam","for":"purpose","difficulty":"Easy/Medium/Hard"}],
  "topColleges": [{"name":"College","location":"City","program":"Program","ranking":"rank"}],
  "proTips": ["tip1","tip2","tip3","tip4","tip5"],
  "commonMistakes": ["mistake1","mistake2","mistake3"],
  "successStory": {"name":"Person","background":"Similar background","journey":"Journey","currentRole":"Role"}
}

Generate 4-5 phases. Make everything India-specific and actionable.`;
}

module.exports = { matchRouter: router, roadmapRouter };

/**
 * routes/chat.js — AI counselor chat
 */
const chatRouter = express.Router();
const { ChatSession } = require("../models/mongo");

// POST /api/chat/message
chatRouter.post("/message", authenticate, async (req, res, next) => {
  try {
    const { sessionId, message, studentProfile, careerCluster } = req.body;

    let session;
    if (sessionId) {
      session = await ChatSession.findById(sessionId);
    } else {
      session = await ChatSession.create({
        studentId: req.studentId,
        careerCluster,
        studentContext: studentProfile,
        messages: [],
      });
    }

    // Append user message
    session.messages.push({ role: "user", content: message });

    // Build Claude messages array
    const claudeMessages = session.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const reply = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: buildChatSystem(studentProfile, careerCluster),
      messages: claudeMessages,
    });

    const assistantText = reply.content.map((b) => b.text || "").join("");
    session.messages.push({ role: "assistant", content: assistantText });
    await session.save();

    res.json({ sessionId: session._id, reply: assistantText });
  } catch (err) {
    next(err);
  }
});

// GET /api/chat/sessions — list sessions for current student
chatRouter.get("/sessions", authenticate, async (req, res, next) => {
  try {
    const sessions = await ChatSession.find({ studentId: req.studentId })
      .select("careerCluster messageCount createdAt updatedAt")
      .sort("-updatedAt");
    res.json(sessions);
  } catch (err) {
    next(err);
  }
});

function buildChatSystem(student, cluster) {
  return `You are a warm, expert career counselor for Indian students (Class 10, 12, UG, PG level).

You are advising ${student?.name || "a student"}, a ${student?.education_level || ""} student
from ${student?.stream || ""} stream who is pursuing a career in ${cluster || "their chosen field"}.

Their interests: ${(student?.top_interests || []).join(", ")}.
Their skills: ${(student?.technical_skills || []).join(", ")}.

Guidelines:
- Be concise, warm, and actionable
- Use bullet points for lists
- Always give India-specific advice (colleges, exams, companies, salaries in INR)
- Be encouraging but realistic
- Reference their specific background when relevant`;
}

module.exports = { matchRouter: router, roadmapRouter, chatRouter };
