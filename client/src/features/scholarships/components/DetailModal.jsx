import React from "react";
import {
  daysLeft,
  fmtAmt,
  deadlineColor,
  typeLabel,
  catLabel,
} from "../utils/helpers";

export default function DetailModal({ sc, onClose, onSave, onApply }) {
  const days = daysLeft(sc.deadline);

  return (
    <div className="sp-modal-overlay" onClick={onClose}>
      <div className="sp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sp-modal-header">
          <div className="sp-modal-title">{sc.name}</div>
          <button
            className="sp-btn"
            onClick={onClose}
            style={{ padding: "4px 12px" }}
          >
            ✕
          </button>
        </div>

        {/* Badges */}
        <div className="sp-sc-meta" style={{ marginBottom: "1rem" }}>
          <span
            className={`sp-badge sp-badge-${sc.type === "merit" ? "blue" : "amber"}`}
          >
            {typeLabel(sc.type)}
          </span>
          <span className="sp-badge sp-badge-gray">
            {catLabel(sc.category)}
          </span>
          {sc.international && (
            <span className="sp-badge sp-badge-purple">🌍 International</span>
          )}
          <span className={`sp-badge ${deadlineColor(days)}`}>
            {days < 0
              ? "Closed"
              : days === 0
                ? "Deadline today!"
                : days <= 30
                  ? `${days} days left`
                  : `Deadline: ${sc.deadline}`}
          </span>
        </div>

        {/* Key metrics */}
        <div className="sp-grid-3" style={{ marginBottom: "1rem" }}>
          <div className="sp-metric">
            <div className="sp-metric-label">Amount</div>
            <div
              className="sp-metric-value"
              style={{ fontSize: "18px", color: "#16a34a" }}
            >
              {sc.amount > 0 ? fmtAmt(sc.amount) : "Varies"}
            </div>
          </div>
          <div className="sp-metric">
            <div className="sp-metric-label">Level</div>
            <div className="sp-metric-value" style={{ fontSize: "15px" }}>
              {{ ug: "Undergraduate", pg: "Postgraduate", phd: "PhD" }[
                sc.level
              ] || sc.level}
            </div>
          </div>
          <div className="sp-metric">
            <div className="sp-metric-label">State</div>
            <div className="sp-metric-value" style={{ fontSize: "15px" }}>
              {sc.state === "all"
                ? "All India"
                : sc.state === "NE"
                  ? "North East"
                  : sc.state}
            </div>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: "14px", lineHeight: 1.7, marginBottom: "1rem" }}>
          {sc.description}
        </p>

        {/* Eligible categories */}
        <div style={{ marginBottom: "1rem" }}>
          <div className="sp-form-label">Eligible categories</div>
          <div className="sp-sc-meta">
            {sc.caste.map((c) => (
              <span key={c} className="sp-badge sp-badge-gray">
                {c.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* Income cap */}
        {sc.income > 0 && (
          <p
            style={{ fontSize: "13px", color: "#6b7280", marginBottom: "1rem" }}
          >
            Max family income: ₹{sc.income.toLocaleString()} per annum
          </p>
        )}

        {/* Tags */}
        <div className="sp-sc-meta" style={{ marginBottom: "1.25rem" }}>
          {sc.tags.map((t) => (
            <span key={t} className="sp-badge sp-badge-blue">
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className={`sp-btn ${sc.saved ? "sp-btn-saved" : "sp-btn-primary"}`}
            style={{ flex: 1 }}
            onClick={() => onSave(sc.id)}
          >
            {sc.saved ? "★ Saved" : "☆ Save"}
          </button>
          <button
            className={`sp-btn ${sc.applied ? "sp-btn-success" : "sp-btn-primary"}`}
            style={{ flex: 1 }}
            onClick={() => onApply(sc.id)}
          >
            {sc.applied ? "✓ Applied" : "Apply Now"}
          </button>
          <a
            href={sc.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ flex: 1 }}
          >
            <button className="sp-btn" style={{ width: "100%" }}>
              Official site ↗
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
