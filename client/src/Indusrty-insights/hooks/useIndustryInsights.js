// hooks/useIndustryInsights.js
// Manages fetching, caching, and loading state for industry data.

import { useState, useCallback, useRef } from "react";
import { fetchIndustryInsights } from "../services/geminiService";

/**
 * Returns { data, loading, error, load }
 * - data: the parsed industry object (or null)
 * - loading: boolean
 * - error: string | null
 * - load(industryId, industryLabel): triggers a fetch (uses cache on repeat calls)
 */
export function useIndustryInsights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simple in-memory cache keyed by industryId — avoids re-fetching during a session
  const cache = useRef({});

  const load = useCallback(async (industryId, industryLabel) => {
    if (cache.current[industryId]) {
      setData(cache.current[industryId]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await fetchIndustryInsights(industryId, industryLabel);
      cache.current[industryId] = result;
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, load };
}
