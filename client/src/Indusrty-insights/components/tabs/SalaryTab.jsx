// components/tabs/SalaryTab.jsx
import React from "react";

const ACCENT_COLOR = "#0ea5e9";

const fmt = (n) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;

export default function SalaryTab({ data }) {
  const color = ACCENT_COLOR;
  const { salaryRange, avgSalary, salaryByExperience } = data;

  const pct =
    ((avgSalary - salaryRange[0]) / (salaryRange[1] - salaryRange[0])) * 80 +
    10;

  const tiers = [
    {
      label: "Entry Level",
      value: salaryByExperience.entry,
      note: "0–2 years",
    },
    { label: "Mid Level", value: salaryByExperience.mid, note: "2–5 years" },
    {
      label: "Senior Level",
      value: salaryByExperience.senior,
      note: "5–10 years",
    },
    { label: "Lead / Head", value: salaryByExperience.lead, note: "10+ years" },
  ];

  return (
    <div>
      {/* Tier grid */}
      <div style={styles.grid}>
        {tiers.map((t) => (
          <div key={t.label} style={styles.tierCard}>
            <p style={styles.tierLabel}>{t.label}</p>
            <p style={{ ...styles.tierValue, color }}>{fmt(t.value)}</p>
            <p style={styles.tierNote}>{t.note}</p>
          </div>
        ))}
      </div>

      {/* Range bar */}
      <p style={styles.rangeHeading}>Salary Range</p>
      <div style={styles.rangeTrack}>
        <div style={styles.rangeFill} />
        <div
          style={{
            ...styles.rangeThumb,
            left: `calc(${pct}% - 7px)`,
            background: color,
            boxShadow: `0 0 0 3px ${color}44`,
          }}
        />
      </div>
      <div style={styles.rangeLabels}>
        <span style={styles.rangeEdge}>{fmt(salaryRange[0])}</span>
        <span style={{ ...styles.rangeEdge, color, fontWeight: 600 }}>
          Avg: {fmt(avgSalary)}
        </span>
        <span style={styles.rangeEdge}>{fmt(salaryRange[1])}</span>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 22,
  },
  tierCard: {
    background: "#f8fafc",
    borderRadius: 10,
    padding: "12px 14px",
    border: "1px solid #e2e8f0",
  },
  tierLabel: {
    fontSize: 10,
    color: "#94a3b8",
    margin: "0 0 4px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tierValue: {
    fontSize: 18,
    fontWeight: 600,
    margin: "0 0 2px",
    letterSpacing: "-0.5px",
  },
  tierNote: {
    fontSize: 10,
    color: "#cbd5e1",
    margin: 0,
  },
  rangeHeading: {
    fontSize: 11,
    fontWeight: 600,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    margin: "0 0 9px",
  },
  rangeTrack: {
    position: "relative",
    height: 32,
    background: "#f1f5f9",
    borderRadius: 99,
    overflow: "visible",
    marginBottom: 6,
  },
  rangeFill: {
    position: "absolute",
    left: "10%",
    right: "8%",
    top: "50%",
    transform: "translateY(-50%)",
    height: 12,
    background: "linear-gradient(90deg, #0ea5e944, #0ea5e9)",
    borderRadius: 99,
  },
  rangeThumb: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 14,
    height: 14,
    borderRadius: "50%",
    border: "2px solid #fff",
  },
  rangeLabels: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 5,
  },
  rangeEdge: {
    fontSize: 11,
    color: "#94a3b8",
  },
};
