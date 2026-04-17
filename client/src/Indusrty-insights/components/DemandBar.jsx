// components/DemandBar.jsx
import React from "react";

export default function DemandBar({ value, color }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.track}>
        <div
          style={{
            ...styles.fill,
            width: `${value}%`,
            background: color,
          }}
        />
      </div>
      <span style={styles.label}>{value}</span>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  track: {
    flex: 1,
    height: 6,
    background: "#f1f5f9",
    borderRadius: 99,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 99,
    transition: "width 0.5s cubic-bezier(.4,0,.2,1)",
  },
  label: {
    fontSize: 11,
    fontWeight: 600,
    color: "#64748b",
    minWidth: 24,
    textAlign: "right",
  },
};
