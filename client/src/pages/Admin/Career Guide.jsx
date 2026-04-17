

// CareerGuidanceApp.jsx — root component, drop into your sidebar content area
import { useState } from "react";
import {ProfileForm}  from "../../components/CareerGuidance/ProfileForm";
import {MatchResults} from "../../components/CareerGuidance/MatchResults";
import {RoadmapView}  from "../../components/CareerGuidance/RoadmapView";

export default function CareerGuidanceApp() {
  const [screen, setScreen] = useState("form");
  const [student, setStudent] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    setStudent(formData);
    setLoading(true);
    setLoadMsg("Running ML analysis...");
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/career/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("API response:", data); // ← open DevTools Console to see raw response
      if (!res.ok)
        throw new Error(
          data.message || data.error || `Server error ${res.status}`,
        );

      // Map FastAPI response → component expected shape
      // FastAPI returns: { recommendations: [{ career, confidence }] }
      // Component needs: { predictions: [{ career_cluster, confidence, match_strength }] }
      const raw =
        data.recommendations || data.predictions || data.results || [];

      const normalizedPredictions = raw.map((p, i) => {
        const conf = parseFloat(p.confidence || p.score || p.probability || 0);
        return {
          career_cluster:
            p.career ||
            p.career_cluster ||
            p.cluster ||
            p.label ||
            `Career ${i + 1}`,
          confidence: parseFloat(conf.toFixed(1)),
          match_strength:
            conf >= 55
              ? "Excellent Match"
              : conf >= 35
                ? "Strong Match"
                : conf >= 20
                  ? "Good Match"
                  : "Possible Match",
        };
      });

      if (normalizedPredictions.length === 0) {
        throw new Error("Model returned empty recommendations");
      }

      setMatchData({
        predictions: normalizedPredictions,
        key_factors: [], // your model doesn't return key_factors — hidden automatically
        similar_students_count: data.similar_students_count || 200,
      });
      setScreen("matching");
    } catch (e) {
      setError(
        e.message || "Failed to fetch — is your backend running on port 3000?",
      );
    }
    setLoading(false);
  };

  const handleCareer = async (cluster) => {
    setLoading(true);
    setLoadMsg("Building your roadmap...");
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentProfile: student,
          careerCluster: cluster,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(
          data.message || data.error || `Server error ${res.status}`,
        );
      const rm = data.roadmap || data;
      setRoadmap({
        ...rm,
        careerPaths: (rm.careerPaths || []).map((cp) => ({
          ...cp,
          salary_range: cp.salaryRange || cp.salary_range || cp.salary,
        })),
        entranceExams:
          rm.entranceExams ||
          (rm.exams || []).map((e) => ({
            name: e.name,
            forWhat: e.for || e.forWhat,
            difficulty: e.difficulty,
          })),
        topColleges:
          rm.topColleges ||
          (rm.colleges || []).map((c) => ({
            name: c.name,
            location: c.location || c.loc,
            program: c.program || c.prog,
            ranking: c.ranking || c.rank,
          })),
        proTips: rm.proTips || rm.tips || [],
        commonMistakes: rm.commonMistakes || rm.mistakes || [],
      });
      setScreen("roadmap");
    } catch (e) {
      setError(e.message || "Failed to generate roadmap.");
    }
    setLoading(false);
  };

  const reset = () => {
    setScreen("form");
    setStudent(null);
    setMatchData(null);
    setRoadmap(null);
    setError("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Outfit:wght@300;400;500;600&display=swap');
        .cga-root *, .cga-root *::before, .cga-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes cgB { 0%,80%,100%{opacity:0} 40%{opacity:1} }
      `}</style>

      {/* ── Outer container: fills whatever space the sidebar layout gives it ── */}
      <div
        style={{
          // width: "100%",
          // height: "100%",
          width: "100%",
          height: "100%",
          // overflowY: "auto",
          // background: "#060910",
          background: "linear-gradient(135deg,#0f172a,#060910)",
          color: "#e2e8f0",
          fontFamily: "'Outfit',sans-serif",
          padding: "28px 20px",
        }}
      >
        {/* Error */}
        {error && (
          <div
            style={{
              maxWidth: 740,
              margin: "0 auto 16px",
              background: "rgba(248,113,113,.08)",
              border: "1px solid rgba(248,113,113,.2)",
              borderRadius: 10,
              padding: "12px 16px",
              color: "#f87171",
              fontSize: 13,
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            ⚠️ {error}
            <button
              onClick={() => setError("")}
              style={{
                background: "none",
                border: "none",
                color: "#f87171",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Screens */}
        {screen === "form" && (
          <ProfileForm onSubmit={handleSubmit} loading={loading} />
        )}
        {screen === "matching" && matchData && (
          <MatchResults
            studentName={student?.name || "Student"}
            matchData={matchData}
            onSelectCareer={handleCareer}
            loading={loading}
          />
        )}
        {screen === "roadmap" && roadmap && (
          <RoadmapView student={student} roadmap={roadmap} onReset={reset} />
        )}

        {/* Loading overlay */}
        {loading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(6,9,16,.88)",
              zIndex: 100,
              display: "grid",
              placeItems: "center",
              backdropFilter: "blur(6px)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,.07)",
                  borderTopColor: "#22d3ee",
                  animation: "spin .7s linear infinite",
                }}
              />
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#64748b",
                  letterSpacing: ".08em",
                }}
              >
                {loadMsg}
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </>
  );
}