/**
 * Returns number of days left until a deadline.
 * Negative = already passed.
 */
export function daysLeft(dateStr) {
  const deadline = new Date(dateStr);
  const now = new Date();
  return Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
}

/**
 * Format rupee amounts compactly: ₹1.2L, ₹80K, ₹500
 */
export function fmtAmt(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

/**
 * Returns a badge class name based on days remaining.
 */
export function deadlineColor(days) {
  if (days < 0) return "sp-badge-gray";
  if (days <= 15) return "sp-badge-red";
  if (days <= 30) return "sp-badge-amber";
  return "sp-badge-green";
}

/**
 * Human-readable scholarship type label.
 */
export function typeLabel(t) {
  return (
    { merit: "Merit Based", economic: "Need Based", research: "Research" }[t] ||
    t
  );
}

/**
 * Human-readable category label.
 */
export function catLabel(c) {
  return (
    {
      central: "Central Govt",
      state: "State Govt",
      private: "Private",
      psu: "PSU",
      international: "International",
      research: "Research",
    }[c] || c
  );
}

export function matchScore(scholarship, profile) {
  if (!profile) return 0;

  // Hard disqualify — income exceeds scholarship cap
  if (
    scholarship.income > 0 &&
    profile.income &&
    parseInt(profile.income) > scholarship.income
  ) {
    return 0;
  }

  let score = 0;

  // Caste eligibility (40 pts)
  if (scholarship.caste.includes(profile.caste)) score += 40;

  // Level match (30 pts)
  if (scholarship.level === profile.level) score += 30;

  // Income within cap (20 pts)
  if (
    scholarship.income === 0 ||
    parseInt(profile.income) <= scholarship.income
  ) {
    score += 20;
  }

  // State match (10 pts)
  if (scholarship.state === "all" || scholarship.state === profile.state)
    score += 10;

  return score;
}
