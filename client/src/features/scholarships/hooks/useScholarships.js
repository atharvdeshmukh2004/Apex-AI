import { useState } from "react";
import { SCHOLARSHIPS } from "../data/scholarships";

export function useScholarships() {
  const [scholarships, setScholarships] = useState(SCHOLARSHIPS);

  function toggleSave(id) {
    setScholarships((prev) =>
      prev.map((s) => (s.id === id ? { ...s, saved: !s.saved } : s)),
    );
  }

  function toggleApply(id) {
    setScholarships((prev) =>
      prev.map((s) => (s.id === id ? { ...s, applied: !s.applied } : s)),
    );
  }

  function addScholarship(entry) {
    setScholarships((prev) => [
      ...prev,
      {
        ...entry,
        id: Date.now(),
        saved: false,
        applied: false,
        saves: 0,
        applications: 0,
      },
    ]);
  }

  function updateScholarship(updated) {
    setScholarships((prev) =>
      prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s)),
    );
  }

  function deleteScholarship(id) {
    setScholarships((prev) => prev.filter((s) => s.id !== id));
  }

  return {
    scholarships,
    toggleSave,
    toggleApply,
    addScholarship,
    updateScholarship,
    deleteScholarship,
  };
}
