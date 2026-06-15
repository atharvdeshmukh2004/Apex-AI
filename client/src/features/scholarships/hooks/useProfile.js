import { useState, useEffect } from "react";

const STORAGE_KEY = "scholarpath_profile";

export function useProfile() {
  const [profile, setProfileState] = useState(() => {
    try {
      const stored = localStorage.getItem("scholarpath_profile");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  function setProfile(data) {
    setProfileState(data);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("ScholarPath: could not save profile to localStorage", e);
    }
  }

  function clearProfile() {
    setProfileState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  return { profile, setProfile, clearProfile };
}
