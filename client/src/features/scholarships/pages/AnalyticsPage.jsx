import React, { useEffect, useRef } from "react";
import { fmtAmt, typeLabel, catLabel } from "../utils/helpers.js";

export default function AnalyticsPage({ scholarships }) {
  const donutRef = useRef(null);
  const barRef = useRef(null);
  const donutChart = useRef(null);
  const barChart = useRef(null);

  const totalSaves = scholarships.reduce((a, s) => a + s.saves, 0);
  const totalApps = scholarships.reduce((a, s) => a + s.applications, 0);
  const convRate =
    totalSaves > 0 ? Math.round((totalApps / totalSaves) * 100) : 0;

  const byType = {
    merit: scholarships.filter((s) => s.type === "merit").length,
    economic: scholarships.filter((s) => s.type === "economic").length,
    research: scholarships.filter((s) => s.type === "research").length,
  };

  const byCat = [
    "central",
    "state",
    "private",
    "psu",
    "international",
    "research",
  ].reduce((acc, k) => {
    acc[k] = scholarships.filter((s) => s.category === k).length;
    return acc;
  }, {});

  const topByAmount = [...scholarships]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 7);

  useEffect(() => {
    // Lazy import Chart.js so it doesn't break SSR
    import("chart.js/auto").then((mod) => {
      const Chart = mod.default;

      if (donutRef.current) {
        if (donutChart.current) donutChart.current.destroy();
        donutChart.current = new Chart(donutRef.current, {
          type: "doughnut",
          data: {
            labels: Object.keys(byCat).map(catLabel),
            datasets: [
              {
                data: Object.values(byCat),
                backgroundColor: [
                  "#3b82f6",
                  "#22c55e",
                  "#f59e0b",
                  "#8b5cf6",
                  "#ec4899",
                  "#14b8a6",
                ],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "right" } },
          },
        });
      }

      if (barRef.current) {
        if (barChart.current) barChart.current.destroy();
        barChart.current = new Chart(barRef.current, {
          type: "bar",
          data: {
            labels: topByAmount.map((s) => s.name.substring(0, 20) + "…"),
            datasets: [
              {
                label: "Amount (₹)",
                data: topByAmount.map((s) => s.amount),
                backgroundColor: "#3b82f6",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { ticks: { font: { size: 10 }, maxRotation: 45 } } },
          },
        });
      }
    });

    return () => {
      donutChart.current?.destroy();
      barChart.current?.destroy();
    };
  }, [scholarships]);

  return (
    <div className="sp-root sp-page">
      <div className="sp-page-title">Analytics</div>
      <div className="sp-page-sub">
        Scholarship database insights and engagement metrics
      </div>
      {/* Top metrics */}
      <div className="sp-grid-4" style={{ marginBottom: "1.5rem" }}>
        {[
          { label: "Total scholarships", value: scholarships.length },
          { label: "Total saves", value: totalSaves },
          { label: "Applications", value: totalApps },
          { label: "Conversion rate", value: `${convRate}%` },
        ].map((m) => (
          <div key={m.label} className="sp-metric">
            <div className="sp-metric-label">{m.label}</div>
            <div className="sp-metric-value">{m.value}</div>
          </div>
        ))}
      </div>
      {/* Charts */}
      <div className="sp-grid-2" style={{ marginBottom: "1.5rem" }}>
        <div className="sp-card">
          <div className="sp-section-title">By category</div>
          <div className="sp-chart-container">
            <canvas ref={donutRef} />
          </div>
        </div>
        <div className="sp-card">
          <div className="sp-section-title">Top scholarships by amount</div>
          <div className="sp-chart-container">
            <canvas ref={barRef} />
          </div>
        </div>
      </div>
      {/* Type breakdown */}
      <div className="sp-card">
        <div className="sp-section-title">Type breakdown</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {Object.entries(byType).map(([type, count]) => (
            <div key={type}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                  fontSize: "13px",
                }}
              >
                <span>{typeLabel(type)}</span>
                <span style={{ fontWeight: 600 }}>
                  {count} ({Math.round((count / scholarships.length) * 100)}%)
                </span>
              </div>
              <div className="sp-progress-bar">
                <div
                  className="sp-progress-fill"
                  style={{
                    width: `${(count / scholarships.length) * 100}%`,
                    background:
                      type === "merit"
                        ? "#3b82f6"
                        : type === "economic"
                          ? "#f59e0b"
                          : "#8b5cf6",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
