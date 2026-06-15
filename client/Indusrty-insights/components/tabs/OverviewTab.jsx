// components/tabs/OverviewTab.jsx
import React from "react";

const ACCENT_COLOR = "#0ea5e9";
const ACCENT_BG = "#e0f2fe";
const ACCENT_TEXT = "#0369a1";

export default function OverviewTab({ data }) {
  const color = ACCENT_COLOR;
  const accent = ACCENT_BG;
  const textAccent = ACCENT_TEXT;

  return (
    <div>
      {/* Demand bar */}
      <div style={{ marginBottom: 20 }}>
        <div style={styles.rowBetween}>
          <span style={styles.sectionTitle}>Market Demand</span>
          <span style={{ ...styles.sectionTitle, color, fontWeight: 600 }}>
            {data.demandScore}%
          </span>
        </div>
        <div style={styles.track}>
          <div
            style={{
              ...styles.fill,
              width: `${data.demandScore}%`,
              background: color,
            }}
          />
        </div>
      </div>

      {/* Outlook */}
      <div
        style={{
          ...styles.outlookBox,
          background: accent,
          borderLeftColor: color,
        }}
      >
        <p style={{ ...styles.outlookHeading, color: textAccent }}>
          2025 Outlook
        </p>
        <p style={{ ...styles.outlookText, color: textAccent }}>
          {data.outlook}
        </p>
      </div>

      {/* Key numbers */}
      <div style={styles.statRow}>
        {[
          { label: "Growth Rate", value: data.trend },
          { label: "Open Positions", value: data.openings },
        ].map((s) => (
          <div key={s.label} style={styles.statBox}>
            <p style={styles.statLabel}>{s.label}</p>
            <p style={{ ...styles.statValue, color }}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 500,
    color: "#374151",
  },
  track: {
    height: 9,
    background: "#f1f5f9",
    borderRadius: 99,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 99,
    transition: "width 0.5s ease",
  },
  outlookBox: {
    borderRadius: 10,
    padding: "13px 15px",
    marginBottom: 18,
    borderLeft: "3px solid",
    marginTop: 18,
  },
  outlookHeading: {
    fontSize: 10,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.7px",
    margin: "0 0 5px",
  },
  outlookText: {
    fontSize: 13,
    margin: 0,
    lineHeight: 1.6,
  },
  statRow: {
    display: "flex",
    gap: 12,
  },
  statBox: {
    flex: 1,
    background: "#f8fafc",
    borderRadius: 10,
    padding: "12px 14px",
    border: "1px solid #e2e8f0",
  },
  statLabel: {
    fontSize: 10,
    color: "#94a3b8",
    margin: "0 0 4px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  statValue: {
    fontSize: 18,
    fontWeight: 600,
    margin: 0,
    letterSpacing: "-0.5px",
  },
};
