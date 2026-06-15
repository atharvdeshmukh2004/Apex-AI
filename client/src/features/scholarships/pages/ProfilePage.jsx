import React, { useState } from "react";

const STATES = [
  { value: "MH", label: "Maharashtra" },
  { value: "DL", label: "Delhi" },
  { value: "KA", label: "Karnataka" },
  { value: "TN", label: "Tamil Nadu" },
  { value: "UP", label: "Uttar Pradesh" },
  { value: "WB", label: "West Bengal" },
  { value: "GJ", label: "Gujarat" },
  { value: "RJ", label: "Rajasthan" },
  { value: "MP", label: "Madhya Pradesh" },
  { value: "KL", label: "Kerala" },
  { value: "HR", label: "Haryana" },
  { value: "PB", label: "Punjab" },
  { value: "NE", label: "North East" },
  { value: "all", label: "Other / All India" },
];

const BLANK_PROFILE = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  state: "",
  caste: "general",
  income: "",
  level: "ug",
  stream: "",
  institution: "",
  percentage: "",
  disability: false,
  exServiceman: false,
};

function Field({ label, children }) {
  return (
    <div className="sp-form-group" style={{ margin: 0 }}>
      <label className="sp-form-label">{label}</label>
      {children}
    </div>
  );
}

export default function ProfilePage({ profile, setProfile }) {
  const [form, setForm] = useState(profile || BLANK_PROFILE);
  const [saved, setSaved] = useState(false);

  function handleSubmit() {
    setProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  console.log("Profile render");
  return (
    <div className="sp-root sp-page">
      <div className="sp-page-title">My Profile</div>
      <div className="sp-page-sub">
        Your profile powers the "For You" tab — the more you fill, the better
        the recommendations.
      </div>

      {saved && (
        <div className="sp-banner sp-banner-success">
          ✓ Profile saved — check the "For You" tab in Scholarships
        </div>
      )}

      <div className="sp-card">
        {/* Personal */}
        <div className="sp-section-title">Personal Information</div>
        <div className="sp-form-row" style={{ marginBottom: "1rem" }}>
          <Field label="Full name">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Arjun Sharma"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="name@example.com"
            />
          </Field>
        </div>
        <div className="sp-form-row" style={{ marginBottom: "1rem" }}>
          <Field label="Phone">
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
            />
          </Field>
          <Field label="Gender">
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </Field>
        </div>

        <hr className="sp-divider" />

        {/* Academic */}
        <div className="sp-section-title">Academic Details</div>
        <div className="sp-form-row" style={{ marginBottom: "1rem" }}>
          <Field label="Current level">
            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
            >
              <option value="ug">Undergraduate (UG)</option>
              <option value="pg">Postgraduate (PG)</option>
              <option value="phd">PhD / Research</option>
              <option value="diploma">Diploma</option>
            </select>
          </Field>
          <Field label="Stream / Field">
            <select
              value={form.stream}
              onChange={(e) => setForm({ ...form, stream: e.target.value })}
            >
              <option value="">Select stream</option>
              <option value="engineering">Engineering / Technology</option>
              <option value="science">Science / Research</option>
              <option value="medical">Medical / Health</option>
              <option value="arts">Arts / Humanities</option>
              <option value="commerce">Commerce / Business</option>
              <option value="law">Law</option>
              <option value="management">Management / MBA</option>
            </select>
          </Field>
        </div>
        <div className="sp-form-row" style={{ marginBottom: "1rem" }}>
          <Field label="Institution">
            <input
              value={form.institution}
              onChange={(e) =>
                setForm({ ...form, institution: e.target.value })
              }
              placeholder="e.g. IIT Bombay"
            />
          </Field>
          <Field label="Class 12 / last exam percentage">
            <input
              type="number"
              value={form.percentage}
              onChange={(e) => setForm({ ...form, percentage: e.target.value })}
              placeholder="e.g. 85"
            />
          </Field>
        </div>

        <hr className="sp-divider" />

        {/* Eligibility */}
        <div className="sp-section-title">Eligibility</div>
        <div className="sp-form-row" style={{ marginBottom: "1rem" }}>
          <Field label="State / UT">
            <select
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            >
              <option value="">Select state</option>
              {STATES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Category">
            <select
              value={form.caste}
              onChange={(e) => setForm({ ...form, caste: e.target.value })}
            >
              <option value="general">General</option>
              <option value="obc">OBC</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
              <option value="ews">EWS</option>
            </select>
          </Field>
        </div>
        <div className="sp-form-row" style={{ marginBottom: "1rem" }}>
          <Field label="Annual family income (₹)">
            <input
              type="number"
              value={form.income}
              onChange={(e) => setForm({ ...form, income: e.target.value })}
              placeholder="e.g. 300000"
            />
          </Field>
          <Field label="Special categories">
            <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.disability}
                  onChange={(e) =>
                    setForm({ ...form, disability: e.target.checked })
                  }
                  style={{ width: "auto" }}
                />
                Differently-abled
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.exServiceman}
                  onChange={(e) =>
                    setForm({ ...form, exServiceman: e.target.checked })
                  }
                  style={{ width: "auto" }}
                />
                Ex-serviceman ward
              </label>
            </div>
          </Field>
        </div>

        <button className="sp-btn sp-btn-primary" onClick={handleSubmit}>
          Save Profile
        </button>
      </div>
    </div>
  );
}
