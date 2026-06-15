import React, { useState } from "react";
import { fmtAmt } from "../utils/helpers";

const BLANK = {
  name: "",
  org: "",
  amount: "",
  type: "merit",
  category: "central",
  level: "ug",
  caste: "general,obc,sc,st",
  income: "0",
  state: "all",
  deadline: "",
  description: "",
  link: "",
  international: false,
  tags: "",
};

export default function AdminPage({
  scholarships,
  addScholarship,
  updateScholarship,
  deleteScholarship,
}) {
  const [modal, setModal] = useState(null); // 'add' | 'edit' | null
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("list");

  function openAdd() {
    setForm({ ...BLANK });
    setModal("add");
  }
  function openEdit(sc) {
    setForm({ ...sc, caste: sc.caste.join(","), tags: sc.tags.join(",") });
    setModal("edit");
  }

  function save() {
    const entry = {
      ...form,
      amount: parseInt(form.amount) || 0,
      income: parseInt(form.income) || 0,
      caste: (form.caste || "")
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      tags: (form.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    modal === "add" ? addScholarship(entry) : updateScholarship(entry);
    setModal(null);
  }

  function handleDelete(id) {
    if (window.confirm("Delete this scholarship?")) deleteScholarship(id);
  }

  const filtered = scholarships.filter(
    (s) =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.org.toLowerCase().includes(search.toLowerCase()),
  );

  const F = ({ label, children }) => (
    <div className="sp-form-group" style={{ margin: 0 }}>
      <label className="sp-form-label">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="sp-root sp-page">
      <div className="sp-page-title">Admin Panel</div>
      <div className="sp-page-sub">Manage the scholarship database</div>

      {/* Sub-tabs */}
      <div className="sp-tab-bar">
        {[
          { id: "list", label: "Scholarships" },
          { id: "scraper", label: "Scraper / Import" },
        ].map((t) => (
          <div
            key={t.id}
            className={`sp-tab${tab === t.id ? " sp-tab-active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </div>
        ))}
      </div>

      {/* Scraper tab */}
      {tab === "scraper" && (
        <div className="sp-card">
          <div className="sp-section-title">Portal Scraper</div>
          <p
            style={{ fontSize: "14px", color: "#6b7280", marginBottom: "1rem" }}
          >
            In production, connect a cron job to these portals and call{" "}
            <code>addScholarship()</code> for each new result.
          </p>
          <div className="sp-grid-2">
            {[
              {
                name: "NSP (scholarships.gov.in)",
                status: "Connected",
                color: "sp-badge-green",
                last: "2 days ago",
              },
              {
                name: "MahaDBT Portal",
                status: "Connected",
                color: "sp-badge-green",
                last: "1 day ago",
              },
              {
                name: "UP Scholarship Portal",
                status: "Pending",
                color: "sp-badge-amber",
                last: "—",
              },
              {
                name: "WB Portal",
                status: "Connected",
                color: "sp-badge-green",
                last: "3 days ago",
              },
              {
                name: "Buddy4Study",
                status: "Pending",
                color: "sp-badge-amber",
                last: "—",
              },
              {
                name: "ScholarshipPortal.in",
                status: "Not connected",
                color: "sp-badge-red",
                last: "—",
              },
            ].map((p) => (
              <div
                key={p.name}
                className="sp-card"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: "13px" }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    Last synced: {p.last}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "6px",
                  }}
                >
                  <span className={`sp-badge ${p.color}`}>{p.status}</span>
                  <button
                    className="sp-btn"
                    style={{ fontSize: "11px", padding: "3px 8px" }}
                  >
                    Sync now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List tab */}
      {tab === "list" && (
        <>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "1.25rem",
              alignItems: "center",
            }}
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              style={{ maxWidth: "300px" }}
            />
            <button
              className="sp-btn sp-btn-primary"
              style={{ marginLeft: "auto" }}
              onClick={openAdd}
            >
              + Add scholarship
            </button>
          </div>
          <div className="sp-card" style={{ padding: 0, overflow: "hidden" }}>
            <table className="sp-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Org</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((sc) => (
                  <tr key={sc.id}>
                    <td>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "13px",
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {sc.name}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: "12px" }}>{sc.org}</div>
                    </td>
                    <td>
                      <span style={{ color: "#16a34a", fontWeight: 600 }}>
                        {fmtAmt(sc.amount)}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`sp-badge sp-badge-${sc.type === "merit" ? "blue" : "amber"}`}
                        style={{ fontSize: "11px" }}
                      >
                        {sc.type}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: "12px" }}>{sc.deadline}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          className="sp-btn"
                          style={{ fontSize: "12px", padding: "4px 8px" }}
                          onClick={() => openEdit(sc)}
                        >
                          Edit
                        </button>
                        <button
                          className="sp-btn sp-btn-danger"
                          style={{ fontSize: "12px", padding: "4px 8px" }}
                          onClick={() => handleDelete(sc.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Add / Edit modal */}
      {modal && (
        <div className="sp-modal-overlay" onClick={() => setModal(null)}>
          <div className="sp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sp-modal-header">
              <div className="sp-modal-title">
                {modal === "add" ? "Add Scholarship" : "Edit Scholarship"}
              </div>
              <button
                className="sp-btn"
                style={{ padding: "4px 12px" }}
                onClick={() => setModal(null)}
              >
                ✕
              </button>
            </div>
            <div className="sp-form-row">
              <F label="Name">
                <input
                  value={form.name || ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </F>
              <F label="Organization">
                <input
                  value={form.org || ""}
                  onChange={(e) => setForm({ ...form, org: e.target.value })}
                />
              </F>
            </div>
            <div className="sp-form-row">
              <F label="Amount (₹)">
                <input
                  type="number"
                  value={form.amount || ""}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />
              </F>
              <F label="Deadline">
                <input
                  type="date"
                  value={form.deadline || ""}
                  onChange={(e) =>
                    setForm({ ...form, deadline: e.target.value })
                  }
                />
              </F>
            </div>
            <div className="sp-form-row">
              <F label="Type">
                <select
                  value={form.type || "merit"}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="merit">Merit</option>
                  <option value="economic">Need Based</option>
                  <option value="research">Research</option>
                </select>
              </F>
              <F label="Category">
                <select
                  value={form.category || "central"}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="central">Central Govt</option>
                  <option value="state">State Govt</option>
                  <option value="private">Private</option>
                  <option value="psu">PSU</option>
                  <option value="international">International</option>
                </select>
              </F>
            </div>
            <div className="sp-form-row">
              <F label="Level">
                <select
                  value={form.level || "ug"}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                >
                  <option value="ug">UG</option>
                  <option value="pg">PG</option>
                  <option value="phd">PhD</option>
                </select>
              </F>
              <F label="State (all / MH / UP ...)">
                <input
                  value={form.state || "all"}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                />
              </F>
            </div>
            <div className="sp-form-row">
              <F label="Eligible castes (comma-sep)">
                <input
                  value={form.caste || ""}
                  onChange={(e) => setForm({ ...form, caste: e.target.value })}
                  placeholder="general,obc,sc,st"
                />
              </F>
              <F label="Max family income (0 = any)">
                <input
                  type="number"
                  value={form.income || 0}
                  onChange={(e) => setForm({ ...form, income: e.target.value })}
                />
              </F>
            </div>
            <div className="sp-form-group">
              <label className="sp-form-label">Official link</label>
              <input
                value={form.link || ""}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="sp-form-group">
              <label className="sp-form-label">Description</label>
              <textarea
                rows={3}
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                style={{ resize: "vertical" }}
              />
            </div>
            <div className="sp-form-row">
              <F label="Tags (comma-sep)">
                <input
                  value={form.tags || ""}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="NSP,merit,central"
                />
              </F>
              <F label="International?">
                <select
                  value={form.international ? "yes" : "no"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      international: e.target.value === "yes",
                    })
                  }
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </F>
            </div>
            <button
              className="sp-btn sp-btn-primary"
              style={{ marginTop: "0.5rem" }}
              onClick={save}
            >
              {modal === "add" ? "Add Scholarship" : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
