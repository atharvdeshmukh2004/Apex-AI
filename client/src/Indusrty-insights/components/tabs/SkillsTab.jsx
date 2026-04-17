// components/tabs/SkillsTab.jsx
import React from "react";

const ACCENT_COLOR = "#0ea5e9";
const ACCENT_BG = "#e0f2fe";
const ACCENT_TEXT = "#0369a1";

export default function SkillsTab({ data }) {
  return (
    <div>
      <p style={styles.heading}>
        Top in-demand skills for {data.industryLabel}
      </p>

      <div style={styles.chipRow}>
        {data.skills.map((skill, i) => (
          <span
            key={skill}
            style={{
              ...styles.chip,
              background: ACCENT_BG,
              color: ACCENT_TEXT,
              border: `1px solid ${ACCENT_COLOR}33`,
              animationDelay: `${i * 60}ms`,
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      <p style={styles.tip}>
        💡 Focus on the top 2–3 skills to increase your shortlist rate
        significantly.
      </p>
    </div>
  );
}

const styles = {
  heading: {
    fontSize: 13,
    fontWeight: 500,
    color: "#374151",
    margin: "0 0 14px",
  },
  chipRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  chip: {
    fontSize: 13,
    fontWeight: 500,
    padding: "6px 14px",
    borderRadius: 99,
  },
  tip: {
    fontSize: 12,
    color: "#94a3b8",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: "10px 14px",
    margin: 0,
    lineHeight: 1.6,
  },
};
