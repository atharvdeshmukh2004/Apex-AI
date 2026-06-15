// services/geminiService.js
// Calls YOUR backend which forwards the request to Gemini.
// Change BASE_URL to match your backend's base URL.

const BASE_URL = import.meta.env.VITE_BACKEND_URL ;

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
You are a career data analyst specializing in the Indian job market.
Return a JSON object for the "${industryLabel}" industry in India for 2025.

IMPORTANT: Return ONLY raw JSON. No markdown, no backticks, no explanation, no text before or after the JSON.

The JSON must follow this exact structure (fill in real data for ${industryLabel}):

{
  "trend": "+12%",
  "trendUp": true,
  "growthRate": 12,
  "demandScore": 87,
  "avgSalary": 1850000,
  "salaryRange": [700000, 3500000],
  "openings": "82,000+",
  "outlook": "Write 2-3 sentences specifically about the ${industryLabel} industry outlook in India in 2025.",
  "topRoles": [
    { "title": "Actual job title in ${industryLabel}", "demand": 90, "salary": 2000000 },
    { "title": "Actual job title in ${industryLabel}", "demand": 85, "salary": 1800000 },
    { "title": "Actual job title in ${industryLabel}", "demand": 80, "salary": 1600000 },
    { "title": "Actual job title in ${industryLabel}", "demand": 75, "salary": 1400000 },
    { "title": "Actual job title in ${industryLabel}", "demand": 70, "salary": 1200000 }
  ],
  "skills": ["Real skill 1", "Real skill 2", "Real skill 3", "Real skill 4", "Real skill 5"],
  "salaryByExperience": {
    "entry": 800000,
    "mid": 1500000,
    "senior": 2500000,
    "lead": 3500000
  }
}

Strict rules:
- Replace every placeholder with REAL data specific to ${industryLabel} in India.
- Do NOT use generic role names like "Role Name" or "Skill1" — use actual titles and skills.
- All salary values: annual INR as plain integers (no commas, no symbols).
- demand: integer 0–100 reflecting actual market demand.
- growthRate: integer, negative if sector is shrinking.
- trendUp: true if growthRate > 0, else false.
- trend: formatted string e.g. "+8%" or "-2%".
- Output ONLY the JSON object. Nothing else.
`.trim();
}

// ---------------------------------------------------------------------------
// Response parser — safely extracts JSON from Gemini's reply
// ---------------------------------------------------------------------------

function parseGeminiResponse(raw, industryLabel) {
  try {
    // Extract JSON block robustly — find the first '{' to the last '}'
    // This handles cases where Gemini adds text before/after the JSON despite instructions
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");

    if (start === -1 || end === -1 || end < start) {
      throw new Error("No JSON object found in Gemini response.");
    }

    const jsonStr = raw.slice(start, end + 1);
    const parsed = JSON.parse(jsonStr);

    // Guard: if Gemini echoed back placeholder role titles, throw so caller can retry
    const hasPlaceholders = parsed.topRoles?.some(
      (r) =>
        !r.title ||
        r.title.toLowerCase().includes("role name") ||
        r.title.toLowerCase().includes("actual job"),
    );
    if (hasPlaceholders) {
      throw new Error("Gemini returned placeholder data. Please retry.");
    }

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
  } catch (err) {
    throw new Error(`Gemini parse error: ${err.message}`);
  }
}
