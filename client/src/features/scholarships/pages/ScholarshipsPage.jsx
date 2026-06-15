import React, { useState, useMemo } from "react";
import ScholarshipCard from "../components/ScholarshipCard";
import DetailModal from "../components/DetailModal";
import { matchScore } from "../utils/helpers.js";

const TABS = [
  { id: "all", label: "All" },
  { id: "recommended", label: "For You" },
  { id: "international", label: "International" },
  { id: "saved", label: "Saved" },
  { id: "applied", label: "Applied" },
];

export default function ScholarshipsPage({
  scholarships,
  toggleSave,
  toggleApply,
  profile,
}) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("deadline");
  const [selected, setSelected] = useState(null);

  console.log("scholarships =", scholarships);
  console.log("isArray =", Array.isArray(scholarships));

  const filtered = useMemo(() => {
    let list = [...scholarships];

    // Tab filters
    if (activeTab === "saved") list = list.filter((s) => s.saved);
    else if (activeTab === "applied") list = list.filter((s) => s.applied);
    else if (activeTab === "international")
      list = list.filter((s) => s.international);
    else if (activeTab === "recommended") {
      list = list
        .map((s) => ({
          ...s,
          score: matchScore(s, profile),
        }))
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score);
    }
    // else if (activeTab === 'recommended') list = list.filter((s) => matchScore(s, profile) >= 70);

    // Search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.org.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    // Dropdown filters
    if (filterType) list = list.filter((s) => s.type === filterType);
    if (filterCat) list = list.filter((s) => s.category === filterCat);
    if (filterLevel) list = list.filter((s) => s.level === filterLevel);

    // Sort
    if (sortBy === "amount") list.sort((a, b) => b.amount - a.amount);
    else if (sortBy === "deadline")
      list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    else if (sortBy === "match")
      list.sort((a, b) => matchScore(b, profile) - matchScore(a, profile));

    return list;
  }, [
    scholarships,
    activeTab,
    search,
    filterType,
    filterCat,
    filterLevel,
    sortBy,
    profile,
  ]);

  return (
    <div className="sp-root sp-page">
      <div className="sp-page-title text-xl font-extrabold">Scholarships</div>

      {/* Tabs */}
      <div className="sp-tab-bar">
        {TABS.map((t) => (
          <div
            key={t.id}
            className={`sp-tab${activeTab === t.id ? " sp-tab-active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </div>
        ))}
      </div>
      {/* Filter bar */}
      <div className="sp-filter-bar">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search scholarships, orgs, tags..."
          style={{ minWidth: "220px" }}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All types</option>
          <option value="merit">Merit Based</option>
          <option value="economic">Need Based</option>
          <option value="research">Research</option>
        </select>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
        >
          <option value="">All categories</option>
          <option value="central">Central Govt</option>
          <option value="state">State Govt</option>
          <option value="private">Private</option>
          <option value="psu">PSU</option>
          <option value="international">International</option>
        </select>
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
        >
          <option value="">All levels</option>
          <option value="ug">UG</option>
          <option value="pg">PG</option>
          <option value="phd">PhD</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ marginLeft: "auto" }}
        >
          <option value="deadline">Sort: Deadline</option>
          <option value="amount">Sort: Amount ↓</option>
          <option value="match">Sort: Match %</option>
        </select>
      </div>
      {/* Results */}
      {filtered.length === 0 ? (
        <div className="sp-empty">
          No scholarships match your filters. Try adjusting the criteria.
        </div>
      ) : (
        <div className="sp-grid-2">
          {filtered.map((sc) => (
            <ScholarshipCard
              key={sc.id}
              sc={sc}
              onSave={toggleSave}
              onApply={toggleApply}
              onSelect={setSelected}
              profile={profile}
              showMatch={activeTab === "recommended"}
            />
          ))}
        </div>
      )}
      {/* Detail modal */}
      {selected && (
        <DetailModal
          sc={selected}
          onClose={() => setSelected(null)}
          onSave={(id) => {
            toggleSave(id);
            setSelected((prev) => ({ ...prev, saved: !prev.saved }));
          }}
          onApply={(id) => {
            toggleApply(id);
            setSelected((prev) => ({ ...prev, applied: !prev.applied }));
          }}
        />
      )}
    </div>
  );
}
