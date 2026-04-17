// RoadmapView.jsx
import { useState, useRef, useEffect } from "react";
import { PHASE_COLORS, S } from "./constants";
import { Pill } from "./SharedComponents";

export function RoadmapView({ student, roadmap, onReset }) {
  const [tab, setTab] = useState("roadmap");
  const [chatOpen, setChatOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState("");
  const [chatLoad, setChatLoad] = useState(false);
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = async () => {
    if (!inp.trim()) return;
    const um = { role: "user", content: inp };
    setMsgs((m) => [...m, um]);
    setInp("");
    setChatLoad(true);
    await new Promise((r) => setTimeout(r, 1200));
    setMsgs((m) => [
      ...m,
      {
        role: "assistant",
        content: `Great question! For ${roadmap.careerTitle.split("—")[0].trim()}, here's my advice:\n\n• Focus on building real projects over tutorials\n• Join communities in your field\n• Set 30-day milestones to stay on track\n\nWant me to go deeper on any of these?`,
      },
    ]);
    setChatLoad(false);
  };

  const TABS = [
    { id: "roadmap", label: "🗺 Roadmap" },
    { id: "careers", label: "💼 Careers & Salaries" },
    { id: "colleges", label: "🏛 Colleges & Exams" },
    { id: "insights", label: "💡 Tips & Insights" },
  ];

  const diffStyle = (d) =>
    ({
      Hard: {
        color: "#f87171",
        borderColor: "rgba(248,113,113,.3)",
        background: "rgba(248,113,113,.08)",
      },
      Medium: {
        color: "#f59e0b",
        borderColor: "rgba(245,158,11,.3)",
        background: "rgba(245,158,11,.08)",
      },
      Easy: {
        color: "#4ade80",
        borderColor: "rgba(74,222,128,.3)",
        background: "rgba(74,222,128,.08)",
      },
    })[d] || {};

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 740,
        margin: "0 auto",
        padding: "0 0 100px",
        position: "relative",
      }}
    >
      {/* header */}
      <div style={{ marginBottom: 24 }}>
        <div style={S.eyebrow}>YOUR PERSONALIZED ROADMAP</div>
        <h1 style={S.pageTitle}>{roadmap.careerTitle}</h1>
        <p style={S.pageSub}>{roadmap.summary}</p>
        <div
          style={{
            display: "inline-flex",
            gap: 20,
            background: "#0c1120",
            border: "1px solid rgba(255,255,255,.07)",
            borderRadius: 13,
            padding: "13px 22px",
            marginTop: 14,
          }}
        >
          {[
            ["Timeline", roadmap.totalDuration],
            ["Phases", roadmap.phases?.length],
            ["Difficulty", roadmap.difficulty],
          ].map(([l, v]) => (
            <div
              key={l}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <span
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontWeight: 800,
                  fontSize: 16,
                }}
              >
                {v}
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 9,
                  color: "#64748b",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                }}
              >
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* tab bar */}
      <div
        style={{
          display: "flex",
          gap: 3,
          background: "#0c1120",
          border: "1px solid rgba(255,255,255,.07)",
          borderRadius: 12,
          padding: 4,
          marginBottom: 22,
          overflowX: "auto",
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              padding: "9px 12px",
              border: "none",
              borderRadius: 9,
              cursor: "pointer",
              background: tab === t.id ? "#111827" : "transparent",
              color: tab === t.id ? "#e2e8f0" : "#64748b",
              fontFamily: "'Outfit',sans-serif",
              fontSize: 13,
              transition: "all .13s",
              whiteSpace: "nowrap",
              minWidth: "fit-content",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── ROADMAP ── */}
      {tab === "roadmap" &&
        roadmap.phases?.map((ph, i) => {
          const c = PHASE_COLORS[i % PHASE_COLORS.length];
          return (
            <div key={i} style={{ display: "flex", gap: 16 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: 3,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: c,
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "monospace",
                    fontWeight: 700,
                    fontSize: 12,
                    color: "#000",
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                {i < roadmap.phases.length - 1 && (
                  <div
                    style={{
                      width: 2,
                      flex: 1,
                      minHeight: 32,
                      borderRadius: 99,
                      background: c + "35",
                      margin: "7px 0",
                    }}
                  />
                )}
              </div>
              <div style={{ flex: 1, paddingBottom: 26, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    color: c,
                    letterSpacing: ".07em",
                    marginBottom: 4,
                  }}
                >
                  {ph.duration}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cabinet Grotesk',sans-serif",
                    fontWeight: 800,
                    fontSize: 18,
                    letterSpacing: "-.02em",
                    marginBottom: 8,
                  }}
                >
                  {ph.title}
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: 13,
                    lineHeight: 1.7,
                    marginBottom: 14,
                  }}
                >
                  {ph.description}
                </p>
                <div
                  style={{
                    background: "#0c1120",
                    border: "1px solid rgba(255,255,255,.07)",
                    borderRadius: 13,
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  <div>
                    <div style={S.psHead}>🎯 Skills</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {ph.skills?.map((s, j) => (
                        <Pill key={j} color={c}>
                          {s}
                        </Pill>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={S.psHead}>📚 Resources</div>
                    {ph.resources?.map((r, j) => (
                      <div
                        key={j}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontSize: 12,
                          padding: "5px 0",
                          borderBottom:
                            j < ph.resources.length - 1
                              ? "1px solid rgba(255,255,255,.05)"
                              : "none",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: 8,
                            padding: "2px 6px",
                            borderRadius: 999,
                            border: "1px solid",
                            flexShrink: 0,
                            ...(r.free
                              ? {
                                  color: "#4ade80",
                                  borderColor: "rgba(74,222,128,.3)",
                                  background: "rgba(74,222,128,.08)",
                                }
                              : {
                                  color: "#f59e0b",
                                  borderColor: "rgba(245,158,11,.3)",
                                  background: "rgba(245,158,11,.08)",
                                }),
                          }}
                        >
                          {r.free ? "FREE" : "PAID"}
                        </span>
                        <span style={{ flex: 1, color: "#e2e8f0" }}>
                          {r.name}
                        </span>
                        <span style={{ color: "#64748b", fontSize: 11 }}>
                          {r.platform}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={S.psHead}>✅ Milestones</div>
                    {ph.milestones?.map((m, j) => (
                      <div
                        key={j}
                        style={{
                          fontSize: 13,
                          color: "#64748b",
                          padding: "3px 0",
                          display: "flex",
                          gap: 7,
                          lineHeight: 1.5,
                        }}
                      >
                        <span style={{ color: c, flexShrink: 0 }}>◆</span>
                        {m}
                      </div>
                    ))}
                  </div>
                  {ph.projects?.length > 0 && (
                    <div>
                      <div style={S.psHead}>🛠 Projects to Build</div>
                      {ph.projects.map((p, j) => (
                        <div
                          key={j}
                          style={{
                            fontSize: 13,
                            color: "#64748b",
                            padding: "3px 0",
                            display: "flex",
                            gap: 7,
                            lineHeight: 1.5,
                          }}
                        >
                          <span style={{ color: "#fb923c", flexShrink: 0 }}>
                            →
                          </span>
                          {p}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

      {/* ── CAREERS ── */}
      {tab === "careers" && (
        <div>
          {roadmap.careerPaths?.map((cp, i) => (
            <div key={i} style={{ ...S.card, marginBottom: 10 }}>
              <div
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  marginBottom: 5,
                }}
              >
                {cp.role}
              </div>
              <div
                style={{
                  color: "#4ade80",
                  fontFamily: "monospace",
                  fontSize: 13,
                  marginBottom: 5,
                }}
              >
                {cp.salary_range}
              </div>
              <div style={{ color: "#64748b", fontSize: 12, marginBottom: 10 }}>
                {cp.growth}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {cp.companies?.map((c, j) => (
                  <span
                    key={j}
                    style={{
                      fontSize: 11,
                      padding: "3px 9px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.08)",
                      color: "#64748b",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {roadmap.successStory && (
            <div
              style={{
                background:
                  "linear-gradient(135deg,rgba(167,139,250,.08),rgba(34,211,238,.08))",
                border: "1px solid rgba(167,139,250,.2)",
                borderRadius: 14,
                padding: 20,
                marginTop: 8,
              }}
            >
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 9,
                  letterSpacing: ".1em",
                  color: "#a78bfa",
                  marginBottom: 10,
                }}
              >
                ✨ SUCCESS STORY
              </div>
              <div
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontWeight: 800,
                  fontSize: 17,
                  marginBottom: 5,
                }}
              >
                {roadmap.successStory.name}
              </div>
              <p style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>
                {roadmap.successStory.background}
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
                {roadmap.successStory.journey}
              </p>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#4ade80",
                }}
              >
                Now: {roadmap.successStory.currentRole}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── COLLEGES ── */}
      {tab === "colleges" && (
        <div>
          <div
            style={{
              fontFamily: "'Cabinet Grotesk',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 12,
            }}
          >
            Entrance Exams
          </div>
          {roadmap.entranceExams?.map((e, i) => (
            <div
              key={i}
              style={{
                ...S.card,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Cabinet Grotesk',sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    marginBottom: 3,
                  }}
                >
                  {e.name}
                </div>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  {e.forWhat}
                </div>
              </div>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  padding: "3px 10px",
                  borderRadius: 999,
                  border: "1px solid",
                  ...diffStyle(e.difficulty),
                }}
              >
                {e.difficulty}
              </span>
            </div>
          ))}
          <div
            style={{
              fontFamily: "'Cabinet Grotesk',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              margin: "20px 0 12px",
            }}
          >
            Top Colleges
          </div>
          {roadmap.topColleges?.map((c, i) => (
            <div
              key={i}
              style={{
                ...S.card,
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "#22d3ee",
                  fontSize: 20,
                  minWidth: 28,
                }}
              >
                #{i + 1}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Cabinet Grotesk',sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    marginBottom: 3,
                  }}
                >
                  {c.name}
                </div>
                <div style={{ fontSize: 11, color: "#64748b" }}>
                  {c.program} · {c.location} · {c.ranking}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── INSIGHTS ── */}
      {tab === "insights" && (
        <div>
          <div
            style={{
              fontFamily: "'Cabinet Grotesk',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 12,
            }}
          >
            🔥 Pro Tips
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
              gap: 10,
              marginBottom: 24,
            }}
          >
            {roadmap.proTips?.map((tip, i) => (
              <div key={i} style={{ ...S.card, display: "flex", gap: 12 }}>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    fontSize: 20,
                    color: "rgba(34,211,238,.25)",
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>
                  {tip}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              fontFamily: "'Cabinet Grotesk',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 12,
            }}
          >
            ⚠️ Mistakes to Avoid
          </div>
          {roadmap.commonMistakes?.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "flex-start",
                fontSize: 13,
                color: "#64748b",
                padding: "10px 14px",
                background: "rgba(248,113,113,.05)",
                border: "1px solid rgba(248,113,113,.1)",
                borderRadius: 10,
                marginBottom: 8,
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: "#f87171", flexShrink: 0 }}>✗</span>
              {m}
            </div>
          ))}
        </div>
      )}

      {/* bottom actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 32,
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <button style={S.btnGhost} onClick={onReset}>
          ← Start Over
        </button>
        <button style={S.btnPrimary} onClick={() => setChatOpen(true)}>
          💬 Ask AI Counselor
        </button>
      </div>

      {/* ── CHAT DRAWER ── */}
      {chatOpen && (
        <div
          onClick={(e) => e.target === e.currentTarget && setChatOpen(false)}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,.75)",
            zIndex: 200,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            padding: 20,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              width: "min(400px,100%)",
              height: "min(560px,90vh)",
              background: "#0c1120",
              border: "1px solid rgba(255,255,255,.09)",
              borderRadius: 18,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "15px 18px",
                borderBottom: "1px solid rgba(255,255,255,.07)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#111827",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Cabinet Grotesk',sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  AI Career Counselor
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#22d3ee",
                    fontFamily: "monospace",
                  }}
                >
                  ● Online
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                style={{
                  background: "none",
                  border: "1px solid rgba(255,255,255,.12)",
                  borderRadius: 7,
                  width: 28,
                  height: 28,
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  color: "#64748b",
                  fontSize: 12,
                }}
              >
                ✕
              </button>
            </div>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: 14,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {msgs.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "28px 16px",
                    color: "#64748b",
                    fontSize: 13,
                    lineHeight: 1.7,
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🤖</div>
                  <p>
                    Hi {student?.name?.split(" ")[0] || "there"}! Ask me
                    anything about your roadmap or what to do next.
                  </p>
                </div>
              )}
              {msgs.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent:
                      m.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "82%",
                      padding: "10px 13px",
                      borderRadius: 14,
                      fontSize: 13,
                      lineHeight: 1.65,
                      whiteSpace: "pre-wrap",
                      ...(m.role === "user"
                        ? {
                            background:
                              "linear-gradient(135deg,#22d3ee,#a78bfa)",
                            color: "#000",
                            borderRadius: "14px 14px 3px 14px",
                          }
                        : {
                            background: "#111827",
                            color: "#e2e8f0",
                            borderRadius: "14px 14px 14px 3px",
                          }),
                    }}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {chatLoad && (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      background: "#111827",
                      padding: "10px 14px",
                      borderRadius: "14px 14px 14px 3px",
                      display: "flex",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "#64748b",
                          display: "inline-block",
                          animation: `cgB 1.4s ${i * 0.2}s infinite both`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
            <div
              style={{
                padding: "10px 12px",
                borderTop: "1px solid rgba(255,255,255,.07)",
                display: "flex",
                gap: 8,
              }}
            >
              <input
                value={inp}
                onChange={(e) => setInp(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about your career path..."
                style={{
                  flex: 1,
                  background: "#111827",
                  border: "1px solid rgba(255,255,255,.07)",
                  borderRadius: 9,
                  padding: "10px 12px",
                  color: "#e2e8f0",
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: 13,
                  outline: "none",
                }}
              />
              <button
                onClick={send}
                disabled={!inp.trim() || chatLoad}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: "#22d3ee",
                  border: "none",
                  color: "#000",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                  opacity: !inp.trim() || chatLoad ? 0.38 : 1,
                }}
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── style constants ── */
