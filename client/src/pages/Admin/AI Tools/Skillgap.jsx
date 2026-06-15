import { useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/api/skill-gap";

const LEVEL_LABELS = [
  "None",
  "Beginner",
  "Basic",
  "Familiar",
  "Developing",
  "Competent",
  "Proficient",
  "Advanced",
  "Expert",
  "Master",
  "World-class",
];

const gapColor = (gap) =>
  gap === 0
    ? "text-green-600 bg-green-50 border-green-200"
    : gap <= 2
      ? "text-yellow-700 bg-yellow-50 border-yellow-200"
      : gap <= 5
        ? "text-orange-600 bg-orange-50 border-orange-200"
        : "text-red-600 bg-red-50 border-red-200";

const gapLabel = (gap) =>
  gap === 0 ? "✓ Met" : gap <= 2 ? "Low" : gap <= 5 ? "Medium" : "High";

const barColor = (pct) =>
  pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-yellow-400" : "bg-red-500";

export default function SkillGap() {
  // ── form state ─────────────────────────────────────────────────────────
  const [career, setCareer] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [experience, setExperience] = useState("");

  // ── flow state ─────────────────────────────────────────────────────────
  const [skills, setSkills] = useState([]); // from /get-skills
  const [userSkills, setUserSkills] = useState({}); // { skillName: 0-10 }
  const [result, setResult] = useState(null); // from /analyze-gap
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phase, setPhase] = useState("setup"); // setup | rate | results

  // ── Step 1: fetch skills from backend ──────────────────────────────────
  async function fetchSkills() {
    if (!career.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API}/get-skills`, {
        career,
        currentRole,
        experience,
      });
      const fetched = Array.isArray(res.data.skills) ? res.data.skills : [];
      if (fetched.length === 0) throw new Error("No skills returned");
      setSkills(fetched);
      // initialise all to 0
      const init = {};
      fetched.forEach((s) => {
        init[s.skill] = 0;
      });
      setUserSkills(init);
      setPhase("rate");
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Failed to fetch skills",
      );
    }
    setLoading(false);
  }

  // ── Step 2: analyze gap ────────────────────────────────────────────────
  async function analyzeGap() {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API}/analyze-gap`, {
        career,
        currentRole,
        skills,
        userSkills,
        experience,
      });
      setResult(res.data);
      setPhase("results");
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Failed to analyze gap",
      );
    }
    setLoading(false);
  }

  function reset() {
    setPhase("setup");
    setSkills([]);
    setUserSkills({});
    setResult(null);
    setError("");
    setCareer("");
    setCurrentRole("");
    setExperience("");
  }

  const catColor = {
    technical: "bg-blue-100 text-blue-700",
    tool: "bg-purple-100 text-purple-700",
    domain: "bg-indigo-100 text-indigo-700",
    soft: "bg-pink-100 text-pink-700",
  };

  // ══════════════════════════════════════════════════════════════════════
  // SETUP
  // ══════════════════════════════════════════════════════════════════════
  if (phase === "setup")
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Skill Gap{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Analyzer
            </span>
          </h1>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            Enter your background and target role. AI will generate skills
            specific to your transition and identify your exact gaps.
          </p>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
              ⚠ {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                Target Career *
              </label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500 transition"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchSkills()}
                placeholder="e.g. Machine Learning Engineer, Product Manager…"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                  Current Role
                </label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500 transition"
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  placeholder="e.g. Software Dev"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                  Experience
                </label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500 transition"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g. 3 years"
                />
              </div>
            </div>

            <button
              onClick={fetchSkills}
              disabled={!career.trim() || loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition mt-2"
            >
              {loading
                ? "Generating skills with AI…"
                : "Generate Skill Assessment →"}
            </button>
          </div>
        </div>
      </div>
    );

  // ══════════════════════════════════════════════════════════════════════
  // RATE SKILLS
  // ══════════════════════════════════════════════════════════════════════
  if (phase === "rate")
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-2 font-semibold">
              {currentRole || "Your background"} → {career}
            </p>
            <h2 className="text-2xl font-bold text-white mb-2">
              Rate Your Skills
            </h2>
            <p className="text-white/40 text-sm leading-relaxed">
              AI identified {skills.length} key skills for{" "}
              <strong className="text-violet-400">{career}</strong>. Slide each
              to your honest current level.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
              ⚠ {error}
            </div>
          )}

          <div className="space-y-3 mb-8">
            {skills.map((s) => {
              const val = userSkills[s.skill] ?? 0;
              const pct = (val / 10) * 100;
              const reqPct = (s.requiredLevel / 10) * 100;
              const gap = Math.max(0, s.requiredLevel - val);
              return (
                <div
                  key={s.skill}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-violet-500/40 transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold text-sm">
                          {s.skill}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColor[s.category] || catColor.technical}`}
                        >
                          {s.category}
                        </span>
                      </div>
                      {s.description && (
                        <p className="text-white/35 text-xs leading-relaxed">
                          {s.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      <p className="text-white font-bold text-lg leading-none">
                        {val}
                        <span className="text-white/30 text-xs">/10</span>
                      </p>
                      <p className="text-white/35 text-xs mt-0.5">
                        {LEVEL_LABELS[val]}
                      </p>
                    </div>
                  </div>

                  {/* Slider */}
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={val}
                    onChange={(e) =>
                      setUserSkills((p) => ({
                        ...p,
                        [s.skill]: +e.target.value,
                      }))
                    }
                    className="w-full accent-violet-500 cursor-pointer"
                  />

                  {/* Bar: current vs required */}
                  <div className="mt-2 flex gap-2 items-center">
                    <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden relative">
                      <div
                        className="absolute left-0 top-0 h-full bg-violet-500/30 rounded-full"
                        style={{ width: `${reqPct}%` }}
                      />
                      <div
                        className={`absolute left-0 top-0 h-full rounded-full transition-all ${barColor(pct)}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${gapColor(gap)}`}
                    >
                      {gapLabel(gap)}
                    </span>
                  </div>
                  <p className="text-white/25 text-xs mt-1">
                    Required: {s.requiredLevel}/10
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setPhase("setup")}
              className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 transition"
            >
              ← Back
            </button>
            <button
              onClick={analyzeGap}
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-sm disabled:opacity-40 hover:opacity-90 transition"
            >
              {loading ? "Analyzing with AI…" : "Analyze My Skill Gap →"}
            </button>
          </div>
        </div>
      </div>
    );

  // ══════════════════════════════════════════════════════════════════════
  // RESULTS
  // ══════════════════════════════════════════════════════════════════════
  const r = result || {};
  const pct = r.readinessPct ?? 0;
  const readColor =
    pct >= 70
      ? "text-green-400"
      : pct >= 45
        ? "text-yellow-400"
        : "text-red-400";
  const readBar =
    pct >= 70
      ? "from-green-500 to-emerald-400"
      : pct >= 45
        ? "from-yellow-400 to-orange-400"
        : "from-red-500 to-orange-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-2 font-semibold">
              {currentRole || "Current"} → {career}
            </p>
            <h1 className="text-2xl font-bold text-white leading-tight">
              {r.headline || "Your Skill Gap Analysis"}
            </h1>
          </div>
          <button
            onClick={reset}
            className="text-xs text-white/40 hover:text-white border border-white/10 px-3 py-2 rounded-lg transition"
          >
            ← New Analysis
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Readiness", val: `${pct}%`, color: readColor },
            {
              label: "Timeline",
              val: `${r.timelineMonths ?? "?"} mo`,
              color: "text-violet-400",
            },
            {
              label: "Top Gaps",
              val: r.priority?.length ?? 0,
              color: "text-red-400",
            },
          ].map((c, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
            >
              <p className={`text-3xl font-bold ${c.color}`}>{c.val}</p>
              <p className="text-white/35 text-xs uppercase tracking-widest mt-1 font-semibold">
                {c.label}
              </p>
            </div>
          ))}
        </div>

        {/* Readiness bar + summary */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-5">
          <div className="flex justify-between text-xs text-white/40 mb-2 font-semibold uppercase tracking-widest">
            <span>Overall Readiness</span>
            <span className={readColor}>{pct}%</span>
          </div>
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden mb-4">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${readBar} transition-all`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-white/55 text-sm leading-relaxed">{r.summary}</p>
        </div>

        {/* Priority skills */}
        {r.priority?.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 mb-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-3">
              Focus on These First
            </p>
            <div className="flex flex-wrap gap-2">
              {r.priority.map((p, i) => (
                <span
                  key={i}
                  className="bg-red-500/15 border border-red-500/25 text-red-300 text-xs px-3 py-1.5 rounded-full font-medium"
                >
                  {i + 1}. {p}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Strengths */}
        {r.strengths?.length > 0 && (
          <div className="bg-green-500/8 border border-green-500/20 rounded-xl p-5 mb-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-3">
              Your Strengths
            </p>
            <div className="space-y-2">
              {r.strengths.map((s, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <div>
                    <span className="text-white text-sm font-medium">
                      {s.skill}
                    </span>
                    {s.detail && (
                      <span className="text-white/40 text-xs ml-2">
                        — {s.detail}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skill analysis */}
        {r.analysis?.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-3">
              Skill-by-Skill Breakdown
            </p>
            <div className="space-y-3">
              {r.analysis.map((item, i) => {
                const filledPct = item.required
                  ? Math.round((item.current / item.required) * 100)
                  : 0;
                const bc =
                  filledPct >= 100
                    ? "bg-green-500"
                    : filledPct >= 60
                      ? "bg-yellow-400"
                      : "bg-red-500";
                const lc =
                  item.level === "High"
                    ? "bg-red-500/15 text-red-300 border-red-500/25"
                    : item.level === "Medium"
                      ? "bg-yellow-500/15 text-yellow-300 border-yellow-500/25"
                      : "bg-green-500/15 text-green-300 border-green-500/25";
                return (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl p-5"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white font-semibold text-sm">
                        {item.skill}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 text-xs">
                          {item.current}/{item.required}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${lc}`}
                        >
                          {item.level} gap
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                      <div
                        className={`h-full rounded-full ${bc} transition-all`}
                        style={{ width: `${Math.min(filledPct, 100)}%` }}
                      />
                    </div>
                    {item.reason && (
                      <p className="text-white/40 text-xs mb-2 leading-relaxed">
                        <strong className="text-white/60">
                          Why it matters:
                        </strong>{" "}
                        {item.reason}
                      </p>
                    )}
                    {item.action && (
                      <p className="text-cyan-400/80 text-xs leading-relaxed">
                        <strong className="text-cyan-400">Action:</strong>{" "}
                        {item.action}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Resources */}
        {r.resources?.length > 0 && (
          <div className="bg-violet-500/8 border border-violet-500/20 rounded-xl p-5 mb-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
              Recommended Resources
            </p>
            <div className="space-y-2">
              {r.resources.map((res, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="text-violet-400">→</span>
                  <div>
                    <span className="text-white font-medium">{res.skill}:</span>
                    <span className="text-white/50 ml-2">{res.resource}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Milestones */}
        {r.milestones?.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-4">
              Your Learning Roadmap
            </p>
            <div className="relative">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-violet-500 to-cyan-500 opacity-30" />
              {r.milestones.map((m, i) => (
                <div key={i} className="flex gap-5 mb-4 pl-10 relative">
                  <div className="absolute left-[13px] top-2.5 w-2.5 h-2.5 rounded-full bg-violet-500 border-2 border-slate-900" />
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex-1">
                    <div className="flex gap-3 items-center mb-2">
                      <span className="text-xs text-violet-400 font-bold font-mono">
                        {m.timeframe}
                      </span>
                      <span className="text-white text-sm font-semibold">
                        {m.goal}
                      </span>
                    </div>
                    {m.actions?.map((a, ai) => (
                      <p
                        key={ai}
                        className="text-white/45 text-xs leading-relaxed pl-3 border-l border-violet-500/30 mb-1"
                      >
                        {a}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => setPhase("rate")}
            className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 transition"
          >
            ← Edit Ratings
          </button>
          <button
            onClick={reset}
            className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 transition"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
