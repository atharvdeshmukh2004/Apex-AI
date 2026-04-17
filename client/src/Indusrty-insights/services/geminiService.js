// services/geminiService.js
// Calls YOUR backend which forwards the request to Gemini.
// Change BASE_URL to match your backend's base URL.

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

/**
 * Fetch industry insights from your backend → Gemini.
 * @param {string} industryId  - e.g. "technology"
 * @param {string} industryLabel - e.g. "Technology"
 * @returns {Promise<IndustryData>}
 */
export async function fetchIndustryInsights(industryId, industryLabel) {
  const prompt = buildPrompt(industryLabel);

  const response = await fetch(`${BASE_URL}/api/gemini`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error(`Backend error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Your backend should return { text: "..." } with Gemini's raw text
  const raw =
    data.text || data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return parseGeminiResponse(raw, industryLabel);
}

// ---------------------------------------------------------------------------
// Prompt builder
// ---------------------------------------------------------------------------

function buildPrompt(industryLabel) {
  return `
You are a career data analyst. Return a JSON object (no markdown, no backticks, no explanation) 
for the "${industryLabel}" industry in India in 2025 with EXACTLY this structure:

{
  "trend": "+12%",
  "trendUp": true,
  "growthRate": 12,
  "demandScore": 87,
  "avgSalary": 1850000,
  "salaryRange": [700000, 3500000],
  "openings": "82,000+",
  "outlook": "2-3 sentence summary of the industry outlook.",
  "topRoles": [
    { "title": "Role Name", "demand": 90, "salary": 2000000 },
    { "title": "Role Name", "demand": 85, "salary": 1800000 },
    { "title": "Role Name", "demand": 80, "salary": 1600000 },
    { "title": "Role Name", "demand": 75, "salary": 1400000 },
    { "title": "Role Name", "demand": 70, "salary": 1200000 }
  ],
  "skills": ["Skill1", "Skill2", "Skill3", "Skill4", "Skill5"],
  "salaryByExperience": {
    "entry": 800000,
    "mid": 1500000,
    "senior": 2500000,
    "lead": 3500000
  }
}

Rules:
- All salary values are annual in INR (integers, no commas).
- demand is an integer 0-100.
- growthRate is an integer (negative if shrinking).
- trendUp is true if growthRate > 0.
- trend is a string like "+12%" or "-3%".
- Return ONLY the JSON. No extra text.
`.trim();
}

// ---------------------------------------------------------------------------
// Response parser — safely extracts JSON from Gemini's reply
// ---------------------------------------------------------------------------

function parseGeminiResponse(raw, industryLabel) {
  try {
    // Strip any accidental markdown fences
    const cleaned = raw
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    // Validate required keys and return with a safe fallback
    return {
      trend: parsed.trend ?? "+0%",
      trendUp: parsed.trendUp ?? true,
      growthRate: parsed.growthRate ?? 0,
      demandScore: parsed.demandScore ?? 50,
      avgSalary: parsed.avgSalary ?? 1000000,
      salaryRange: parsed.salaryRange ?? [500000, 2000000],
      openings: parsed.openings ?? "N/A",
      outlook: parsed.outlook ?? "Data unavailable.",
      topRoles: parsed.topRoles ?? [],
      skills: parsed.skills ?? [],
      salaryByExperience: parsed.salaryByExperience ?? {
        entry: 600000,
        mid: 1000000,
        senior: 1800000,
        lead: 2800000,
      },
      industryLabel,
    };
  } catch {
    throw new Error(
      "Failed to parse Gemini response. Check your backend prompt handling.",
    );
  }
}
