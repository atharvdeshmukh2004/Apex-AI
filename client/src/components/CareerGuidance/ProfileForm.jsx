// ProfileForm.jsx
import { useState } from "react";
import { STREAMS, INTERESTS, TECH_SKILLS, S } from "./constants";

/* ═══════════════════════════════════
   SCREEN 1 – PROFILE FORM
═══════════════════════════════════ */
const FORM_STEPS = ["Academic", "Interests", "Skills", "Preferences"];

export function ProfileForm({ onSubmit, loading }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    education_level: "12",
    stream: "",
    percentage_score: 75,
    top_interests: [],
    technical_skills: [],
    soft_skills: {
      communication: 3,
      leadership: 3,
      teamwork: 3,
      analytical: 3,
      creative: 3,
    },
    learning_style: "hands-on",
    work_preference: "office",
    risk_appetite: "medium",
    location_preference: "national",
    aspirations: "",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggle = (k, v) =>
    set(
      k,
      form[k].includes(v) ? form[k].filter((x) => x !== v) : [...form[k], v],
    );
  const setSoft = (k, v) => set("soft_skills", { ...form.soft_skills, [k]: v });
  const canNext =
    step === 0
      ? !!(form.name && form.stream)
      : step === 1
        ? form.top_interests.length >= 2
        : true;

  return (
    <div
      style={{
        // width: "100%",
        // maxWidth: 700,
        maxWidth: 900,
        margin: "0 auto",
        padding: "0 0 0px",
      }}
    >
      {/* stepper */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 24,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {FORM_STEPS.map((s, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                fontSize: 11,
                fontFamily: "monospace",
                fontWeight: 700,
                flexShrink: 0,
                background: i < step ? "#22d3ee" : "transparent",
                border: `1.5px solid ${i <= step ? "#22d3ee" : "rgba(255,255,255,.12)"}`,
                color: i < step ? "#000" : i === step ? "#22d3ee" : "#64748b",
              }}
            >
              {i < step ? "✓" : i + 1}
            </div>
            <span
              style={{
                fontSize: 12,
                color: i === step ? "#e2e8f0" : "#64748b",
                margin: "0 8px",
                whiteSpace: "nowrap",
              }}
            >
              {s}
            </span>
            {i < FORM_STEPS.length - 1 && (
              <div
                style={{
                  width: 24,
                  height: 1,
                  background:
                    i < step ? "rgba(34,211,238,.4)" : "rgba(255,255,255,.08)",
                  marginRight: 8,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* card */}
      <div key={step} style={S.card}>
        {/* STEP 0 – ACADEMIC */}
        {step === 0 && (
          <>
            <h2 style={S.cardTitle}>Tell us about yourself</h2>
            <p style={S.cardSub}>
              Your academic background helps calibrate the ML model.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 18,
              }}
            >
              <div>
                <div style={S.label}>Full Name *</div>
                <input
                  style={S.input}
                  placeholder="e.g. Priya Sharma"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </div>
              <div>
                <div style={S.label}>
                  Score:{" "}
                  <b style={{ color: "#22d3ee" }}>{form.percentage_score}%</b>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={form.percentage_score}
                  onChange={(e) => set("percentage_score", +e.target.value)}
                  style={{
                    width: "100%",
                    accentColor: "#22d3ee",
                    marginTop: 10,
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <div style={S.label}>Education Level *</div>
              <div style={S.chipRow}>
                {["10", "12", "UG", "PG"].map((l) => (
                  <button
                    key={l}
                    style={S.chip(form.education_level === l)}
                    onClick={() => {
                      set("education_level", l);
                      set("stream", "");
                    }}
                  >
                    {
                      {
                        10: "Class 10",
                        12: "Class 12",
                        UG: "Under Graduate",
                        PG: "Post Graduate",
                      }[l]
                    }
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={S.label}>Stream / Branch *</div>
              <div style={S.chipRow}>
                {(STREAMS[form.education_level] || []).map((s) => (
                  <button
                    key={s}
                    style={S.chip(form.stream === s)}
                    onClick={() => set("stream", s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* STEP 1 – INTERESTS */}
        {step === 1 && (
          <>
            <h2 style={S.cardTitle}>What excites you? ✨</h2>
            <p style={S.cardSub}>
              Pick at least 2 areas you're genuinely interested in.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(106px,1fr))",
                gap: 8,
              }}
            >
              {INTERESTS.map((o) => {
                const on = form.top_interests.includes(o.id);
                return (
                  <button
                    key={o.id}
                    onClick={() => toggle("top_interests", o.id)}
                    style={{
                      padding: "12px 6px",
                      borderRadius: 12,
                      cursor: "pointer",
                      border: `1px solid ${on ? "rgba(34,211,238,.6)" : "rgba(255,255,255,.07)"}`,
                      background: on ? "rgba(34,211,238,.08)" : "#111827",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      position: "relative",
                      transition: "all .15s",
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{o.emoji}</span>
                    <span
                      style={{
                        fontSize: 11,
                        color: on ? "#67e8f9" : "#64748b",
                        textAlign: "center",
                      }}
                    >
                      {o.label}
                    </span>
                    {on && (
                      <span
                        style={{
                          position: "absolute",
                          top: 5,
                          right: 5,
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: "#22d3ee",
                          display: "grid",
                          placeItems: "center",
                          fontSize: 9,
                          color: "#000",
                          fontWeight: 700,
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <p
              style={{
                fontSize: 11,
                color: "#475569",
                marginTop: 10,
                fontFamily: "monospace",
              }}
            >
              {form.top_interests.length}/14 selected (min 2)
            </p>
          </>
        )}

        {/* STEP 2 – SKILLS */}
        {step === 2 && (
          <>
            <h2 style={S.cardTitle}>Your Skills</h2>
            <p style={S.cardSub}>
              Rate your soft skills and pick your technical strengths.
            </p>
            <div style={S.label}>Soft Skills (1 = Beginner → 5 = Expert)</div>
            {Object.entries(form.soft_skills).map(([sk, val]) => (
              <div
                key={sk}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    width: 110,
                    fontSize: 13,
                    color: "#94a3b8",
                    textTransform: "capitalize",
                    flexShrink: 0,
                  }}
                >
                  {sk}
                </span>
                <div style={{ display: "flex", gap: 5 }}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setSoft(sk, n)}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 7,
                        cursor: "pointer",
                        border: `1px solid ${n <= val ? "#22d3ee" : "rgba(255,255,255,.1)"}`,
                        background:
                          n <= val ? "rgba(34,211,238,.15)" : "transparent",
                        color: n <= val ? "#22d3ee" : "#475569",
                        fontSize: 12,
                        fontWeight: 700,
                        transition: "all .12s",
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ marginTop: 18 }}>
              <div style={S.label}>Technical Skills</div>
              <div style={S.chipRow}>
                {TECH_SKILLS.map((s) => (
                  <button
                    key={s.id}
                    style={S.chip(form.technical_skills.includes(s.id))}
                    onClick={() => toggle("technical_skills", s.id)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* STEP 3 – PREFERENCES */}
        {step === 3 && (
          <>
            <h2 style={S.cardTitle}>Work Style & Goals</h2>
            <p style={S.cardSub}>
              Help us understand how and where you want to work.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18,
                marginBottom: 16,
              }}
            >
              {[
                {
                  label: "Learning Style",
                  key: "learning_style",
                  opts: [
                    ["visual", "👁 Visual"],
                    ["reading", "📖 Reading"],
                    ["hands-on", "🔧 Hands-on"],
                    ["auditory", "🎧 Auditory"],
                  ],
                },
                {
                  label: "Work Preference",
                  key: "work_preference",
                  opts: [
                    ["remote", "💻 Remote"],
                    ["office", "🏢 Office"],
                    ["fieldwork", "🌍 Fieldwork"],
                    ["lab", "🔬 Lab"],
                  ],
                },
                {
                  label: "Risk Appetite",
                  key: "risk_appetite",
                  opts: [
                    ["low", "🛡 Play Safe"],
                    ["medium", "⚖️ Balanced"],
                    ["high", "🚀 High Risk"],
                  ],
                },
                {
                  label: "Location",
                  key: "location_preference",
                  opts: [
                    ["local", "🏠 My City"],
                    ["national", "🇮🇳 India"],
                    ["international", "✈️ Global"],
                  ],
                },
              ].map((row) => (
                <div key={row.key}>
                  <div style={S.label}>{row.label}</div>
                  <div style={S.chipRow}>
                    {row.opts.map(([v, l]) => (
                      <button
                        key={v}
                        style={S.chip(form[row.key] === v)}
                        onClick={() => set(row.key, v)}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={S.label}>Aspirations (optional)</div>
            <textarea
              style={{ ...S.input, resize: "vertical" }}
              rows={3}
              placeholder="e.g. I want to build my own startup someday..."
              value={form.aspirations}
              onChange={(e) => set("aspirations", e.target.value)}
            />
          </>
        )}
      </div>

      {/* nav */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {step > 0 ? (
          <button style={S.btnGhost} onClick={() => setStep((s) => s - 1)}>
            ← Back
          </button>
        ) : (
          <div />
        )}
        {step < FORM_STEPS.length - 1 ? (
          <button
            style={{ ...S.btnPrimary, opacity: canNext ? 1 : 0.38 }}
            disabled={!canNext}
            onClick={() => setStep((s) => s + 1)}
          >
            Continue →
          </button>
        ) : (
          <button
            style={{ ...S.btnPrimary, opacity: loading ? 0.5 : 1 }}
            disabled={loading}
            onClick={() => onSubmit(form)}
          >
            {loading ? "Analyzing..." : "🔮 Find My Career Match"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileForm;
