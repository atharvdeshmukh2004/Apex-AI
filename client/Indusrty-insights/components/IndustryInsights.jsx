// components/IndustryInsights.jsx
// Main orchestrator component. Drop this into any page/route.
// Usage: <IndustryInsights />

import React, { useState, useEffect } from "react";
import { INDUSTRIES, TABS } from "../constants/industries";
import { useIndustryInsights } from "../hooks/useIndustryInsights";
import MetricCard from "./MetricCard";
import OverviewTab from "./tabs/OverviewTab";
import RolesTab from "./tabs/RolesTab";
import SalaryTab from "./tabs/SalaryTab";
import SkillsTab from "./tabs/SkillsTab";

const ACCENT = "#0ea5e9";

export default function IndustryInsights() {
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]);
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const { data, loading, error, load } = useIndustryInsights();

  // Use selectedIndustry.id (primitive) so useEffect triggers correctly on every change
  useEffect(() => {
    load(selectedIndustry.id, selectedIndustry.label);
  }, [selectedIndustry.id]);

  const handleIndustryChange = (industry) => {
    setSelectedIndustry(industry);
    setActiveTab(TABS[0].id);
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Industry Insights</h2>
        <p style={styles.subtitle}>
          AI-powered job demand, salaries & growth trends — India 2025
        </p>
      </div>

      {/* Industry selector */}
      <div style={styles.selectorRow}>
        {INDUSTRIES.map((ind) => (
          <button
            key={ind.id}
            onClick={() => handleIndustryChange(ind)}
            style={{
              ...styles.selectorBtn,
              ...(selectedIndustry.id === ind.id
                ? {
                    ...styles.selectorBtnActive,
                    borderColor: ACCENT,
                    color: ACCENT,
                  }
                : {}),
            }}
          >
            {ind.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={styles.stateBox}>
          <div style={styles.spinner} />
          <p style={styles.stateText}>
            Fetching insights for {selectedIndustry.label}…
          </p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div style={styles.errorBox}>
          <p style={styles.errorText}>⚠ {error}</p>
          <button
            style={styles.retryBtn}
            onClick={() =>
              load(selectedIndustry.id, selectedIndustry.label, true)
            }
          >
            Retry
          </button>
        </div>
      )}

      {/* Data */}
      {data && !loading && !error && (
        <>
          {/* Metric cards */}
          <div style={styles.metricsRow}>
            <MetricCard
              label="Avg. Salary"
              value={fmt(data.avgSalary)}
              sub="per year"
              valueColor={ACCENT}
            />
            <MetricCard
              label="Demand Score"
              value={`${data.demandScore}/100`}
              sub="market strength"
              valueColor={ACCENT}
            />
            <MetricCard
              label="Growth Rate"
              value={data.trend}
              sub="year-on-year"
              valueColor={data.trendUp ? "#10b981" : "#f43f5e"}
            />
            <MetricCard
              label="Open Positions"
              value={data.openings}
              sub="active listings"
              valueColor={ACCENT}
            />
          </div>

          {/* Tab panel */}
          <div style={styles.panel}>
            {/* Tab bar */}
            <div style={styles.tabBar}>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    ...styles.tabBtn,
                    ...(activeTab === tab.id ? styles.tabBtnActive : {}),
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={styles.tabContent}>
              {activeTab === "overview" && <OverviewTab data={data} />}
              {activeTab === "roles" && <RolesTab data={data} />}
              {activeTab === "salary" && <SalaryTab data={data} />}
              {activeTab === "skills" && <SkillsTab data={data} />}
            </div>
          </div>
        </>
      )}

      <style>{spinnerCSS}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const fmt = (n) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = {
  page: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: "#f8fafc",
    minHeight: "100vh",
    padding: "32px 24px",
    boxSizing: "border-box",
    maxWidth: 960,
    margin: "0 auto",
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    color: "#0f172a",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    margin: "6px 0 0",
  },
  selectorRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  selectorBtn: {
    padding: "7px 14px",
    borderRadius: 99,
    border: "1.5px solid #e2e8f0",
    background: "#fff",
    fontSize: 13,
    fontWeight: 500,
    color: "#64748b",
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "inherit",
  },
  selectorBtnActive: {
    background: "#e0f2fe",
  },
  stateBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 0",
    gap: 16,
  },
  spinner: {
    width: 32,
    height: 32,
    border: "3px solid #e2e8f0",
    borderTop: `3px solid ${ACCENT}`,
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  stateText: {
    fontSize: 14,
    color: "#94a3b8",
    margin: 0,
  },
  errorBox: {
    background: "#fff1f2",
    border: "1px solid #fecdd3",
    borderRadius: 10,
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  errorText: {
    fontSize: 13,
    color: "#be123c",
    margin: 0,
  },
  retryBtn: {
    padding: "6px 14px",
    borderRadius: 8,
    border: "1px solid #fecdd3",
    background: "#fff",
    color: "#be123c",
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  metricsRow: {
    display: "flex",
    gap: 12,
    marginBottom: 16,
    flexWrap: "wrap",
  },
  panel: {
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
    overflow: "hidden",
  },
  tabBar: {
    display: "flex",
    gap: 4,
    padding: "12px 16px",
    borderBottom: "1px solid #f1f5f9",
  },
  tabBtn: {
    padding: "7px 16px",
    borderRadius: 7,
    border: "none",
    background: "transparent",
    color: "#64748b",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.15s",
  },
  tabBtnActive: {
    background: "#0f172a",
    color: "#fff",
  },
  tabContent: {
    padding: "20px 20px 24px",
  },
};

const spinnerCSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
  @keyframes spin { to { transform: rotate(360deg); } }
`;
