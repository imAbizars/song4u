// hooks/useSearchMessage.js
'use client'
import { useState, useEffect } from "react";
import axios from "axios";

export function useSearchMessage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // fetch lagu dengan debounce
  useEffect(() => {
    const fetchSongs = async () => {
      if (!query.trim()) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const res = await axios.get("/api/search", { params: { q: query } });
        setResults(res.data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsSearching(false);
      }
    };

    const timeout = setTimeout(fetchSongs, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (track) => {
    setSelected(track);
    setQuery("");
    setResults([]);
    setIsLoading(true);
  };

  return {
    query,
    setQuery,
    results,
    selected,
    handleSelect,
    isLoading,
    setIsLoading,
    isSearching,
  };
}
