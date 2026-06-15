import React from "react";
import {
  daysLeft,
  fmtAmt,
  deadlineColor,
  typeLabel,
  catLabel,
  matchScore,
} from "../utils/helpers";

export default function ScholarshipCard({
  sc,
  onSave,
  onApply,
  onSelect,
  profile,
  showMatch,
}) {
  const days = daysLeft(sc.deadline);
  const score = showMatch ? matchScore(sc, profile) : null;

  return (
    <div
      className={`sp-scholarship-card${sc.saved ? " sp-saved" : ""}`}
      onClick={() => onSelect(sc)}
    >
      <div className="sp-sc-header">
        <div>
          <div className="sp-sc-title">{sc.name}</div>
          <div className="sp-sc-org">{sc.org}</div>
        </div>
        <div className="sp-sc-amount">
          {sc.amount > 0 ? fmtAmt(sc.amount) : "Varies"}
        </div>
      </div>

      <div className="sp-sc-meta">
        <span
          className={`sp-badge sp-badge-${sc.type === "merit" ? "blue" : sc.type === "economic" ? "amber" : "purple"}`}
        >
          {typeLabel(sc.type)}
        </span>
        <span className="sp-badge sp-badge-gray">{catLabel(sc.category)}</span>
        {sc.international && (
          <span className="sp-badge sp-badge-purple">🌍 International</span>
        )}
        <span className={`sp-badge ${deadlineColor(days)}`}>
          {days < 0
            ? "Closed"
            : days === 0
              ? "Today!"
              : days <= 30
                ? `${days}d left`
                : "Open"}
        </span>
      </div>

      {score !== null && (
        <div className="sp-match-row">
          <span>Match</span>
          <div className="sp-match-bar">
            <div className="sp-match-fill" style={{ width: `${score}%` }} />
          </div>
          <span style={{ fontWeight: 600 }}>{score}%</span>
        </div>
      )}

      <div className="sp-sc-actions" onClick={(e) => e.stopPropagation()}>
        <button
          className={`sp-btn ${sc.saved ? "sp-btn-saved" : ""}`}
          onClick={() => onSave(sc.id)}
        >
          {sc.saved ? "★ Saved" : "☆ Save"}
        </button>
        <button
          className={`sp-btn ${sc.applied ? "sp-btn-success" : "sp-btn-primary"}`}
          onClick={() => onApply(sc.id)}
        >
          {sc.applied ? "✓ Applied" : "Apply"}
        </button>
        <a
          href={sc.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ flex: 1 }}
        >
          <button className="sp-btn" style={{ width: "100%" }}>
            Site ↗
          </button>
        </a>
      </div>
    </div>
  );
}
