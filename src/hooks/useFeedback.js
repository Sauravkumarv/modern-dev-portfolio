import { useMemo, useState } from "react";
import { feedbackSectionContent } from "../data/feedback";

const STORAGE_KEY = "portfolio-feedback";
const STORAGE_VERSION = 2;

const readStoredEntries = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const writeStoredEntries = (entries) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
  } catch {
    return false;
  }
};

const clearStoredEntries = () => {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures so the app still renders.
  }
};

const getDefaultEntries = () => feedbackSectionContent.initialEntries.map(normalizeEntry);

const normalizeEntry = (entry) => ({
  id: entry.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  name: entry.name?.trim().slice(0, 48) || "Unknown",
  rating: Math.min(Math.max(Number(entry.rating) || 5, 1), 5),
  comment: entry.comment?.trim().slice(0, 320) || "",
  createdAt: entry.createdAt || new Date().toISOString(),
});

const getInitialEntries = () => {
  if (typeof window === "undefined") {
    return getDefaultEntries();
  }

  const storedEntries = readStoredEntries();

  if (!storedEntries) {
    return getDefaultEntries();
  }

  try {
    const parsedEntries = JSON.parse(storedEntries);

    if (
      parsedEntries &&
      typeof parsedEntries === "object" &&
      parsedEntries.version === STORAGE_VERSION &&
      Array.isArray(parsedEntries.entries) &&
      parsedEntries.entries.length > 0
    ) {
      return parsedEntries.entries.map(normalizeEntry);
    }
  } catch {
    clearStoredEntries();
  }

  clearStoredEntries();
  return getDefaultEntries();
};

const useFeedback = () => {
  const [entries, setEntries] = useState(getInitialEntries);

  const addEntry = (entry) => {
    let persisted = false;

    setEntries((currentEntries) => {
      const nextEntries = [normalizeEntry(entry), ...currentEntries].slice(0, 8);
      persisted = writeStoredEntries({
        version: STORAGE_VERSION,
        entries: nextEntries,
      });
      return nextEntries;
    });

    return { persisted };
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
