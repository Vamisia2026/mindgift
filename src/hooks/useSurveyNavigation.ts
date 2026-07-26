import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MA_DEFINITIONS,
  type MADefinition,
  type MALevel,
} from "@/data/maDefinitions";

// ---------- Types ----------

export type UserProfile = {
  ageGroup: string;
  relationship: string;
};

/**
 * A single tag captured from an answered option.
 * Aggregated across the session and used downstream for profiling.
 */
export type CollectedTag = {
  tag: string;
  maId: string;
  levelId: string;
  optionId: string;
};

export type SurveyState = {
  currentMA: string | null;
  completedMAs: string[];   // MAs answered to the last level
  terminatedMAs: string[];  // MAs discarded via IDK — excluded from pool
  collectedTags: CollectedTag[];
};

const STORAGE_KEY = "vamisia:survey";

const EMPTY_STATE: SurveyState = {
  currentMA: null,
  completedMAs: [],
  terminatedMAs: [],
  collectedTags: [],
};

// ---------- Pure helpers ----------

export function isEligible(ma: MADefinition, profile: UserProfile): boolean {
  return (
    ma.eligibility.ageGroups.includes(profile.ageGroup) &&
    ma.eligibility.relationships.includes(profile.relationship)
  );
}

function pickRandom<T>(pool: T[]): T | null {
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function eligiblePool(
  profile: UserProfile,
  completedMAs: string[],
  terminatedMAs: string[],
  currentMA: string | null,
): MADefinition[] {
  return MA_DEFINITIONS.filter(
    (ma) =>
      !completedMAs.includes(ma.id) &&
      !terminatedMAs.includes(ma.id) &&
      ma.id !== currentMA &&
      isEligible(ma, profile),
  );
}

function isValidState(value: unknown): value is SurveyState {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    (v.currentMA === null || typeof v.currentMA === "string") &&
    Array.isArray(v.completedMAs) &&
    v.completedMAs.every((x) => typeof x === "string") &&
    Array.isArray(v.terminatedMAs) &&
    v.terminatedMAs.every((x) => typeof x === "string") &&
    Array.isArray(v.collectedTags)
  );
}

function hydrate(): SurveyState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed: unknown = JSON.parse(raw);
    return isValidState(parsed) ? parsed : EMPTY_STATE;
  } catch {
    return EMPTY_STATE;
  }
}

function saveProgress(state: SurveyState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage may be unavailable (private mode, quota) — fail silently.
  }
}

// ---------- Hook ----------

export function useSurveyNavigation(profile: UserProfile) {
  const [state, setState] = useState<SurveyState>(EMPTY_STATE);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const hydrated = useRef(false);

  // Hydrate from localStorage once on mount (client only).
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    const restored = hydrate();
    if (!restored.currentMA) {
      const next = pickRandom(
        eligiblePool(profile, restored.completedMAs, restored.terminatedMAs, null),
      );
      const seeded: SurveyState = { ...restored, currentMA: next?.id ?? null };
      setState(seeded);
      saveProgress(seeded);
    } else {
      setState(restored);
    }
    setCurrentLevelIndex(0);
    // Intentionally run once on mount — profile changes handled via resetSurvey.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentMA = useMemo<MADefinition | null>(
    () =>
      state.currentMA
        ? MA_DEFINITIONS.find((ma) => ma.id === state.currentMA) ?? null
        : null,
    [state.currentMA],
  );

  const currentLevel: MALevel | null = useMemo(() => {
    if (!currentMA) return null;
    return currentMA.levels[currentLevelIndex] ?? null;
  }, [currentMA, currentLevelIndex]);

  const isComplete = useMemo(() => {
    if (state.currentMA) return false;
    return (
      eligiblePool(profile, state.completedMAs, state.terminatedMAs, null)
        .length === 0
    );
  }, [state.currentMA, state.completedMAs, state.terminatedMAs, profile]);

  const selectNextMA = useCallback(
    (base: SurveyState): SurveyState => {
      const next = pickRandom(
        eligiblePool(profile, base.completedMAs, base.terminatedMAs, null),
      );
      const nextState: SurveyState = { ...base, currentMA: next?.id ?? null };
      setCurrentLevelIndex(0);
      saveProgress(nextState);
      return nextState;
    },
    [profile],
  );

  /**
   * Record an answer for the current level.
   * - Appends the option's tag to collectedTags.
   * - Advances to the next level, or completes the MA if this was the last level.
   */
  const answer = useCallback(
    (optionId: string) => {
      setState((prev) => {
        if (!currentMA || !currentLevel) return prev;
        const option = currentLevel.options.find((o) => o.id === optionId);
        if (!option) return prev;

        const nextTags: CollectedTag[] = [
          ...prev.collectedTags,
          {
            tag: option.tag,
            maId: currentMA.id,
            levelId: currentLevel.id,
            optionId,
          },
        ];

        const isLast = currentLevelIndex >= currentMA.levels.length - 1;

        if (isLast) {
          const base: SurveyState = {
            ...prev,
            collectedTags: nextTags,
            completedMAs: prev.completedMAs.includes(currentMA.id)
              ? prev.completedMAs
              : [...prev.completedMAs, currentMA.id],
            currentMA: null,
          };
          return selectNextMA(base);
        }

        const next: SurveyState = { ...prev, collectedTags: nextTags };
        saveProgress(next);
        return next;
      });

      if (
        currentMA &&
        currentLevelIndex < currentMA.levels.length - 1
      ) {
        setCurrentLevelIndex((i) => i + 1);
      }
    },
    [currentMA, currentLevel, currentLevelIndex, selectNextMA],
  );

  /**
   * "I DON'T KNOW" — strict Save → Terminate → Switch.
   * Valid at any depth (MA / Level / Option). No go-back, no parent-node.
   *  1. saveProgress on the current state (all tags collected so far persist).
   *  2. terminateMA: drop currentMA, add it to terminatedMAs (excluded from pool).
   *     Tags already collected within the terminated MA are kept.
   *  3. selectNextMA from the eligible pool.
   */
  const dontKnow = useCallback(() => {
    setState((prev) => {
      saveProgress(prev);
      if (!prev.currentMA) return selectNextMA(prev);
      const terminated: SurveyState = {
        ...prev,
        currentMA: null,
        terminatedMAs: prev.terminatedMAs.includes(prev.currentMA)
          ? prev.terminatedMAs
          : [...prev.terminatedMAs, prev.currentMA],
      };
      return selectNextMA(terminated);
    });
  }, [selectNextMA]);

  const resetSurvey = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
    setCurrentLevelIndex(0);
    const next = pickRandom(eligiblePool(profile, [], [], null));
    const withMA: SurveyState = { ...EMPTY_STATE, currentMA: next?.id ?? null };
    setState(withMA);
    saveProgress(withMA);
  }, [profile]);

  return {
    state,
    currentMA,
    currentLevel,
    currentLevelIndex,
    collectedTags: state.collectedTags,
    answer,
    dontKnow,
    resetSurvey,
    isComplete,
  };
}
