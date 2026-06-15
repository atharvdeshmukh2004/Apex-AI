import { useState } from "react";
import { CLUSTER_EMOJI, ACCENT_COLORS, S } from "./constants";
import { AnimBar } from "./SharedComponents";
import { useNavigate } from "react-router-dom";
import ProfileForm from "./ProfileForm";
/* ═══════════════════════════════════
   SCREEN 2 – MATCH RESULTS
═══════════════════════════════════ */
function MatchResults({ studentName, matchData, onSelectCareer, loading }) {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 700,
        margin: "0 auto",
        padding: "0 0 60px",
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <div style={S.eyebrow}>ML ANALYSIS COMPLETE</div>
        <h1 style={S.pageTitle}>Your Matches, {studentName.split(" ")[0]}</h1>
        <p style={S.pageSub}>
          Analyzed against{" "}
          <b style={{ color: "#e2e8f0" }}>
            {matchData.similar_students_count}+
          </b>{" "}
          similar student profiles using Random Forest.
        </p>
      </div>

      {/* factors — only shown if model returns key_factors */}
      {matchData.key_factors && matchData.key_factors.length > 0 && (
        <div style={{ ...S.card, marginBottom: 16 }}>
          <div
            style={{
              fontFamily: "'Cabinet Grotesk',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 14,
            }}
          >
            🧠 What drove your match
          </div>
          {matchData.key_factors.map((f, i) => (
            <AnimBar
              key={i}
              label={f.factor}
              value={f.weight}
              color={ACCENT_COLORS[i % ACCENT_COLORS.length]}
              delay={i * 80}
            />
          ))}
        </div>
      )}

      {/* predictions */}
      <div style={S.eyebrow}>Select a career to continue</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          margin: "12px 0 20px",
        }}
      >
        {matchData.predictions.map((p, i) => {
          const sel = selected === p.career_cluster;
          const top = i === 0;
          return (
            <div
              key={i}
              onClick={() => setSelected(p.career_cluster)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 18px",
                borderRadius: 14,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "all .15s",
                background: sel ? "rgba(34,211,238,.05)" : "#0c1120",
                border: `1px solid ${sel ? "rgba(34,211,238,.6)" : top ? "rgba(34,211,238,.2)" : "rgba(255,255,255,.07)"}`,
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: ACCENT_COLORS[i],
                  minWidth: 22,
                  fontWeight: 700,
                }}
              >
                #{i + 1}
              </span>
              <span style={{ fontSize: 24, flexShrink: 0 }}>
                {CLUSTER_EMOJI[p.career_cluster] || "🎯"}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'Cabinet Grotesk',sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: 3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.career_cluster}
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    color: ACCENT_COLORS[i],
                  }}
                >
                  {p.match_strength}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: 22,
                  color: ACCENT_COLORS[i],
                  flexShrink: 0,
                }}
              >
                {p.confidence}%
              </div>
              {top && (
                <span style={{ position: "absolute", top: 10, right: 12 }}>
                  👑
                </span>
              )}
              {sel && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 8,
                    right: 12,
                    fontFamily: "monospace",
                    fontSize: 10,
                    color: "#22d3ee",
                    background: "rgba(34,211,238,.1)",
                    border: "1px solid rgba(34,211,238,.25)",
                    padding: "2px 8px",
                    borderRadius: 999,
                  }}
                >
                  Selected ✓
                </span>
              )}
            </div>
          );
        })}
      </div>

      <button
        style={{
          ...S.btnPrimary,
          width: "100%",
          opacity: !selected || loading ? 0.4 : 1,
        }}
        disabled={!selected || loading}
        onClick={() => onSelectCareer(selected)}
      >
        {loading
          ? "Generating Roadmap..."
          : selected
            ? `Generate Roadmap for "${selected}" →`
            : "Select a career above"}
      </button>
      <button
        onClick={() => (window.location.href = "/admin/users")}
        className="
        mt-4
    flex-1
    px-5
    py-3
    rounded-2xl
    bg-gradient-to-r
    from-cyan-500/20
    to-blue-500/20
    border
    border-cyan-400/30
    text-cyan-300
    font-semibold
    text-sm
    backdrop-blur-md
    shadow-lg
    hover:scale-[1.02]
    hover:from-cyan-500/30
    hover:to-blue-500/30
    hover:border-cyan-300/50
    hover:text-white
    active:scale-[0.98]
    transition-all
    duration-300
  "
      >
        ↺ Start Over
      </button>
    </div>
  );
}

export default MatchResults;
