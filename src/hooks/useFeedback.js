import { useMemo, useState } from "react";
import { feedbackSectionContent } from "../data/feedback";

const STORAGE_KEY = "portfolio-feedback";

const normalizeEntry = (entry) => ({
  id: entry.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  name: entry.name?.trim() || "Anonymous",
  rating: Math.min(Math.max(Number(entry.rating) || 5, 1), 5),
  comment: entry.comment?.trim() || "",
  createdAt: entry.createdAt || new Date().toISOString(),
});

const getInitialEntries = () => {
  if (typeof window === "undefined") {
    return feedbackSectionContent.initialEntries.map(normalizeEntry);
  }

  const storedEntries = window.localStorage.getItem(STORAGE_KEY);

  if (!storedEntries) {
    return feedbackSectionContent.initialEntries.map(normalizeEntry);
  }

  try {
    const parsedEntries = JSON.parse(storedEntries);

    if (Array.isArray(parsedEntries) && parsedEntries.length > 0) {
      return parsedEntries.map(normalizeEntry);
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return feedbackSectionContent.initialEntries.map(normalizeEntry);
};

const useFeedback = () => {
  const [entries, setEntries] = useState(getInitialEntries);

  const addEntry = (entry) => {
    setEntries((currentEntries) => {
      const nextEntries = [normalizeEntry(entry), ...currentEntries].slice(0, 8);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEntries));
      return nextEntries;
    });
  };

  const averageRating = useMemo(
    () => entries.reduce((total, entry) => total + entry.rating, 0) / Math.max(entries.length, 1),
    [entries]
  );

  return {
    entries,
    addEntry,
    averageRating,
  };
};

export default useFeedback;
