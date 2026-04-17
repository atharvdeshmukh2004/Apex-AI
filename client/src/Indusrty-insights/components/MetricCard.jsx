// components/MetricCard.jsx
import React from "react";

export default function MetricCard({ label, value, sub, valueColor }) {
  return (
    <div style={styles.card}>
      <p style={styles.label}>{label}</p>
      <p style={{ ...styles.value, color: valueColor || "#0f172a" }}>{value}</p>
      <p style={styles.sub}>{sub}</p>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: "14px 16px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
    flex: 1,
    minWidth: 0,
  },
  label: {
    fontSize: 10,
    color: "#94a3b8",
    margin: "0 0 4px",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    fontWeight: 500,
  },
  value: {
    fontSize: 20,
    fontWeight: 600,
    margin: "0 0 2px",
    letterSpacing: "-0.5px",
  },
  sub: {
    fontSize: 11,
    color: "#cbd5e1",
    margin: 0,
  },
};
