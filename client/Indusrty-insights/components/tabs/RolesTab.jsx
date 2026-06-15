// components/tabs/RolesTab.jsx
import React from "react";
import DemandBar from "../DemandBar";

const ACCENT_COLOR = "#0ea5e9";

const fmt = (n) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;

export default function RolesTab({ data }) {
  const color = ACCENT_COLOR;

  return (
    <div>
      <p style={styles.hint}>Demand score out of 100 · avg annual salary</p>

      {data.topRoles.map((role) => (
        <div key={role.title} style={styles.row}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={styles.roleTitle}>{role.title}</p>
            <DemandBar value={role.demand} color={color} />
          </div>
          <div style={styles.salaryCell}>
            <p style={{ ...styles.salary, color }}>{fmt(role.salary)}</p>
            <p style={styles.salaryLabel}>avg/yr</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  hint: {
    fontSize: 11,
    color: "#94a3b8",
    margin: "0 0 4px",
    fontWeight: 500,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "11px 0",
    borderBottom: "1px solid #f1f5f9",
  },
  roleTitle: {
    fontSize: 13,
    fontWeight: 500,
    color: "#0f172a",
    margin: "0 0 6px",
  },
  salaryCell: {
    textAlign: "right",
    flexShrink: 0,
  },
  salary: {
    fontSize: 13,
    fontWeight: 600,
    margin: 0,
  },
  salaryLabel: {
    fontSize: 10,
    color: "#cbd5e1",
    margin: 0,
  },
};
