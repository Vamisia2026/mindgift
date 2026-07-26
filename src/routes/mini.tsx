import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { analyzeProfile, type DeepSeekResult } from "@/lib/deepseek.functions";
import { backupSurveyResult } from "@/lib/surveyBackup.functions";
import {
  calculateBudget,
  buildAmazonLink,
  type BudgetRange,
  type AmazonRegion,
} from "@/lib/budget.utils";
import { orderAreas, enforcePronouns, type MacroAreaHint } from "@/lib/journeyRouting";
import { Typewriter } from "@/components/mini/Typewriter";
import { FadeIn } from "@/components/mini/FadeIn";
import { Link as LinkIcon, Check } from "lucide-react";

export const Route = createFileRoute("/mini")({
  head: () => ({
    meta: [
      { title: "MindGift — Gift discovery journey" },
      {
        name: "description",
        content:
          "A guided, psychology-driven journey to discover the perfect gift.",
      },
    ],
  }),
  component: MiniPage,
});

// ---------- types ----------
type ScreeningOption = {
  id: string;
  question_id: string;
  sort_order: number;
  value: string;
  label: string;
  base_tier: string | null;
  multiplier_key: string | null;
  modifier_key: string | null;
};
type AgeMappingRow = { group_key: string; min_age: number; max_age: number };
type Level = {
  id: string;
  macro_area_id: string;
  question: string;
  sort_order: number;
};
type OptionRow = {
  id: string;
  level_id: string;
  label: string;
  tag: string;
  sort_order: number;
};

const RELATIONSHIP_LABELS: Record<string, string> = {
  partner: "My partner",
  "close-friend-family": "A close friend or a family member",
  "coworker-client-acquaintance": "A coworker, client or acquaintance",
  "line-manager-supervisor": "My line manager or boss",
};

const MIN_JOURNEY_STEPS = 10;
const TOTAL_STEPS = 4 + MIN_JOURNEY_STEPS;
const LAST_GIFTS_KEY = "vamisia:last_gifts";
const RETAKE_LABEL = "Not sure about our suggestion? Retake the test!";

type Phase = "screening" | "journey" | "complete";

// ---------- editorial primitives ----------
const editorialShell = "min-h-screen bg-[var(--editorial-bg)] text-[var(--editorial-ink)]";
const editorialColumn = "mx-auto max-w-2xl px-6 pt-6 pb-16 sm:px-8 sm:pt-8";
const eyebrow = "text-[0.7rem] uppercase tracking-[0.28em] text-[var(--secondary)] font-semibold";

function ProgressRule({ ratio }: { ratio: number }) {
  return (
    <div className="fixed inset-x-0 top-0 z-40 h-[2px] bg-[var(--editorial-rule-track)]">
      <div
        className="h-[2px] bg-[var(--editorial-rule-fill)] transition-[width] duration-500 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, ratio * 100))}%` }}
      />
    </div>
  );
}


function VamisiaLogo() {
  return (
    <FadeIn>
      <h1
        className="font-[var(--font-display)] font-black tracking-[-0.03em] text-[var(--editorial-ink)] mb-4 text-center leading-none"
        style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
      >
        MINDGIFT
      </h1>
    </FadeIn>
  );
}

// ---------- root ----------
function MiniPage() {
  const [phase, setPhase] = useState<Phase>("screening");

  const [screenStep, setScreenStep] = useState(0);
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("");
  const [occasion, setOccasion] = useState<string>("");

  const [eligibleAreas, setEligibleAreas] = useState<MacroAreaHint[]>([]);
  const [terminated, setTerminated] = useState<Set<string>>(new Set());
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [currentArea, setCurrentArea] = useState<string | null>(null);
  const [levelIdx, setLevelIdx] = useState(0);
  const [profile, setProfile] = useState<
    { tag: string; areaId: string; levelId: string; label: string }[]
  >([]);
  const stepsTaken = profile.length;

  const { data: options } = useQuery({
    queryKey: ["screening_options_all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("screening_options")
        .select("*")
        .in("question_id", ["sq-1", "sq-3", "sq-4", "sq-5"])
        .order("sort_order");
      if (error) throw error;
      return data as ScreeningOption[];
    },
  });

  const { data: ageMapping } = useQuery({
    queryKey: ["age_mapping"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("age_mapping")
        .select("*")
        .order("min_age");
      if (error) throw error;
      return data as AgeMappingRow[];
    },
  });

  const ageGroupKey = useMemo(() => {
    const n = Number(age);
    if (!ageMapping || !age || Number.isNaN(n)) return null;
    return (
      ageMapping.find((r) => n >= r.min_age && n <= r.max_age)?.group_key ??
      null
    );
  }, [age, ageMapping]);

  const opts = (qid: string) =>
    options?.filter((o) => o.question_id === qid) ?? [];

  // Gender: only Male / Female (drop "doesn't matter").
  const genderOpts = opts("sq-1").filter((o) => {
    const v = (o.value ?? "").toLowerCase();
    const l = (o.label ?? "").toLowerCase();
    return v === "male" || v === "female" || l === "male" || l === "female";
  });

  const { data: levels } = useQuery({
    enabled: !!currentArea,
    queryKey: ["levels", currentArea],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("levels")
        .select("*")
        .eq("macro_area_id", currentArea!)
        .order("sort_order");
      if (error) throw error;
      return data as Level[];
    },
  });

  const currentLevel = levels?.[levelIdx];

  const { data: levelOptions } = useQuery({
    enabled: !!currentLevel,
    queryKey: ["level_options", currentLevel?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("options")
        .select("*")
        .eq("level_id", currentLevel!.id)
        .order("sort_order");
      if (error) throw error;
      return data as OptionRow[];
    },
  });

  const isScreeningComplete = (occ: string) =>
    !!(gender && ageGroupKey && relationship && occ);

  // Tag-driven next-area selection.
  const pickNextArea = (
    seenTags: string[],
    terminatedSet: Set<string>,
    visitedSet: Set<string>,
  ): string | null => {
    const ordered = orderAreas(eligibleAreas, seenTags, terminatedSet);
    for (const id of ordered) if (!visitedSet.has(id)) return id;
    return null;
  };

  const startJourney = async (occasionOverride?: string) => {
    const occ = occasionOverride ?? occasion;
    if (!isScreeningComplete(occ)) return;
    const { data, error } = await supabase
      .from("macro_areas")
      .select(
        "id, sort_order, title, macro_area_eligible_age_groups!inner(age_group), macro_area_eligible_relationships!inner(relationship_key)",
      )
      .eq("macro_area_eligible_age_groups.age_group", ageGroupKey!)
      .eq("macro_area_eligible_relationships.relationship_key", relationship);
    if (error || !data || data.length === 0) {
      setPhase("complete");
      return;
    }
    const areas: MacroAreaHint[] = data.map((r) => ({
      id: r.id as string,
      sort_order: (r as { sort_order: number }).sort_order,
      title: (r as { title: string }).title ?? "",
    }));
    setEligibleAreas(areas);
    const first = orderAreas(areas, [], new Set())[0] ?? null;
    if (!first) {
      setPhase("complete");
      return;
    }
    setVisited(new Set([first]));
    setCurrentArea(first);
    setLevelIdx(0);
    setPhase("journey");
  };

  const advanceArea = (seenTags: string[], nextTerminated: Set<string>) => {
    const nextVisited = new Set(visited);
    const next = pickNextArea(seenTags, nextTerminated, nextVisited);
    if (!next) {
      setCurrentArea(null);
      setPhase("complete");
      return;
    }
    nextVisited.add(next);
    setVisited(nextVisited);
    setCurrentArea(next);
    setLevelIdx(0);
  };

  const finishIfGoalMet = (steps: number) => {
    if (steps >= MIN_JOURNEY_STEPS) {
      setCurrentArea(null);
      setPhase("complete");
      return true;
    }
    return false;
  };

  // Low-interest tags: skip remaining levels of the current MA when picked
  // at the first level. Keeps the tag in the profile so the AI still sees it.
  const LOW_INTEREST_TAGS = new Set([
    "pet-detached",
    "pet-none",
    "reader-casual",
    "gaming-casual-none",
    "audio-passive",
  ]);

  const pickOption = (o: OptionRow) => {
    if (!currentArea || !currentLevel) return;
    const nextProfile = [
      ...profile,
      { tag: o.tag, areaId: currentArea, levelId: currentLevel.id, label: o.label },
    ];
    setProfile(nextProfile);
    if (finishIfGoalMet(nextProfile.length)) return;
    const isLowInterestPivot = levelIdx === 0 && LOW_INTEREST_TAGS.has(o.tag);
    if (!isLowInterestPivot && levels && levelIdx + 1 < levels.length) {
      setLevelIdx(levelIdx + 1);
      return;
    }
    advanceArea(nextProfile.map((p) => p.tag), terminated);
  };

  const skipCurrentArea = () => {
    if (!currentArea) return;
    const nextTerminated = new Set(terminated);
    nextTerminated.add(currentArea);
    setTerminated(nextTerminated);
    advanceArea(profile.map((p) => p.tag), nextTerminated);
  };

  useEffect(() => {
    if (phase === "journey" && levels && levels.length === 0) {
      advanceArea(profile.map((p) => p.tag), terminated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, levels]);

  const resetAll = () => {
    setPhase("screening");
    setScreenStep(0);
    setGender("");
    setAge("");
    setRelationship("");
    setOccasion("");
    setEligibleAreas([]);
    setTerminated(new Set());
    setVisited(new Set());
    setCurrentArea(null);
    setLevelIdx(0);
    setProfile([]);
  };


  const progressRatio =
    phase === "complete"
      ? 1
      : phase === "screening"
        ? screenStep / TOTAL_STEPS
        : (4 + Math.min(stepsTaken, MIN_JOURNEY_STEPS)) / TOTAL_STEPS;

  const advanceScreen = (pickedOccasion?: string) => {
    if (screenStep < 3) setScreenStep(screenStep + 1);
    else startJourney(pickedOccasion);
  };

  return (
    <main className={editorialShell}>
      <ProgressRule ratio={progressRatio} />
      <div className={editorialColumn}>
        <VamisiaLogo />


        {phase === "screening" && (
          <ScreeningStep
            step={screenStep}
            gender={gender}
            setGender={setGender}
            age={age}
            setAge={setAge}
            ageGroupKey={ageGroupKey}
            relationship={relationship}
            setRelationship={setRelationship}
            occasion={occasion}
            setOccasion={setOccasion}
            genderOpts={genderOpts}
            relationshipOpts={opts("sq-3")}
            occasionOpts={opts("sq-4")}
            onAdvance={advanceScreen}
          />
        )}

        {phase === "journey" && (
          <JourneyStep
            level={currentLevel}
            options={levelOptions}
            onPick={pickOption}
            onSkip={skipCurrentArea}
          />
        )}

        {phase === "complete" && (
          <CompleteView
            bundle={{
              screening: {
                gender,
                age: age ? Number(age) : null,
                age_group: ageGroupKey,
                relationship,
                occasion,
              },
              tags: profile.map((p) => p.tag),
              journey: profile,
              generated_at: new Date().toISOString(),
              version: 1,
            }}
            onReset={resetAll}
          />
        )}
      </div>
    </main>
  );
}

// ---------- screening ----------
function ScreeningStep(props: {
  step: number;
  gender: string;
  setGender: (v: string) => void;
  age: string;
  setAge: (v: string) => void;
  ageGroupKey: string | null;
  relationship: string;
  setRelationship: (v: string) => void;
  occasion: string;
  setOccasion: (v: string) => void;
  genderOpts: ScreeningOption[];
  relationshipOpts: ScreeningOption[];
  occasionOpts: ScreeningOption[];
  onAdvance: (pickedOccasion?: string) => void;
}) {
  const {
    step, gender, setGender, age, setAge, ageGroupKey,
    relationship, setRelationship, occasion, setOccasion,
    genderOpts, relationshipOpts, occasionOpts,
    onAdvance,
  } = props;

  const questions = [
    "What is this person's gender?",
    "How old is this person?",
    "Who is this person to you?",
    "What is the primary occasion for this gift?",
  ];

  useEffect(() => {
    if (step !== 1) return;
    if (!ageGroupKey) return;
    const t = setTimeout(() => onAdvance(), 700);
    return () => clearTimeout(t);
  }, [step, ageGroupKey, onAdvance]);

  return (
    <section key={`screen-${step}`} className="editorial-fade">
      <h2
        className="font-[var(--font-display)] font-bold leading-[1.1] tracking-tight mb-10 text-[#004497]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
      >
        <Typewriter text={questions[step]} />
      </h2>

      {step === 0 && (
        <ChoiceList
          value={gender}
          onChange={(v) => { setGender(v); setTimeout(onAdvance, 220); }}
          items={genderOpts.map((o) => ({ value: o.value, label: o.label }))}
        />
      )}

      {step === 1 && (
        <div className="editorial-fade" style={{ animationDelay: "160ms" }}>
          <input
            type="number"
            min={0}
            max={120}
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && ageGroupKey) onAdvance();
            }}
            autoFocus
            className="w-full max-w-[280px] border-2 border-[var(--primary)] rounded bg-white px-5 py-4 font-[var(--font-display)] text-4xl text-[var(--editorial-ink)] outline-none transition-shadow focus:shadow-[0_12px_32px_-12px_rgba(0,68,151,0.35)]"
          />
        </div>
      )}

      {step === 2 && (
        <ChoiceList
          value={relationship}
          onChange={(v) => { setRelationship(v); setTimeout(onAdvance, 220); }}
          items={relationshipOpts.map((o) => ({
            value: o.base_tier ?? o.value,
            label: RELATIONSHIP_LABELS[o.base_tier ?? o.value] ?? o.label,
          }))}
        />
      )}

      {step === 3 && (
        <ChoiceList
          value={occasion}
          onChange={(v) => {
            setOccasion(v);
            // Pass the just-picked value to avoid stale-state on final step.
            setTimeout(() => onAdvance(v), 220);
          }}
          items={occasionOpts.map((o) => ({
            value: o.multiplier_key ?? o.value,
            label: o.label,
          }))}
        />
      )}
    </section>
  );
}

function ChoiceList({
  value, onChange, items,
}: {
  value: string;
  onChange: (v: string) => void;
  items: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((it, i) => {
        const active = value === it.value;
        return (
          <FadeIn key={it.value} delay={120 + i * 70}>
            <button
              type="button"
              onClick={() => onChange(it.value)}
              data-active={active ? "true" : "false"}
              className="choice-card"
            >
              <span>{it.label}</span>
              <span aria-hidden className="opacity-70">→</span>
            </button>
          </FadeIn>
        );
      })}
    </div>
  );
}

// ---------- journey ----------
function JourneyStep({
  level, options, onPick, onSkip,
}: {
  level: Level | undefined;
  options: OptionRow[] | undefined;
  onPick: (o: OptionRow) => void;
  onSkip: () => void;
}) {
  const questionText = level?.question ?? "";

  return (
    <section key={level?.id ?? "loading"} className="editorial-fade">
      <h2
        className="font-[var(--font-display)] font-bold leading-[1.1] tracking-tight mb-10 min-h-[3rem] text-[#0B7060]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
      >
        {level ? <Typewriter text={questionText} /> : "\u00A0"}
      </h2>

      {!level || !options ? (
        <div className="space-y-3">
          <div className="h-16 w-full animate-pulse rounded bg-[var(--editorial-hairline)]" />
          <div className="h-16 w-full animate-pulse rounded bg-[var(--editorial-hairline)]" />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {options.slice(0, 2).map((o, i) => (
              <FadeIn key={o.id} delay={questionText.length * 22 + 100 + i * 90}>
                <button
                  type="button"
                  onClick={() => onPick(o)}
                  className="choice-card"
                >
                  <span>{o.label}</span>
                  <span aria-hidden className="opacity-70">→</span>
                </button>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={questionText.length * 22 + 320}>
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={onSkip}
                className="inline-block border border-[#0B7060] bg-white text-[#0B7060] uppercase text-[0.75rem] tracking-widest font-semibold py-2.5 px-6 rounded-[4px] transition-colors hover:bg-[#0B7060] hover:text-white"
              >
                I don't know
              </button>
            </div>
          </FadeIn>
        </>
      )}
    </section>
  );
}

// ---------- complete ----------
type ExportBundle = {
  screening: {
    gender: string;
    age: number | null;
    age_group: string | null;
    relationship: string;
    occasion: string;
  };
  tags: string[];
  journey: { tag: string; areaId: string; levelId: string; label: string }[];
  generated_at: string;
  version: number;
};

function CompleteView({
  bundle, onReset,
}: {
  bundle: ExportBundle;
  onReset: () => void;
}) {
  const analyze = useServerFn(analyzeProfile);
  const backup = useServerFn(backupSurveyResult);
  const [result, setResult] = useState<DeepSeekResult | null>(null);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState<BudgetRange | null>(null);
  const [activeRegion, setActiveRegion] = useState<AmazonRegion>("US");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setFailed(false);
    setResult(null);
    setBudget(null);

    let previousGifts: string[] = [];
    if (typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem(LAST_GIFTS_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) previousGifts = parsed.filter((s) => typeof s === "string").slice(-2);
        }
      } catch { /* noop */ }
    }

    const g = bundle.screening.gender;
    const pronouns =
      g === "male"
        ? { subject: "He", object: "him", possessive: "his" }
        : g === "female"
          ? { subject: "She", object: "her", possessive: "her" }
          : { subject: "This person", object: "this person", possessive: "this person's" };
    const payload = { ...bundle, previous_gifts: previousGifts, pronouns };

    const runAnalyze = async (): Promise<DeepSeekResult> => {
      try {
        return await analyze({ data: { userAnswers: payload } });
      } catch (e) {
        console.warn("[mini] analyze retry after failure:", e);
        return analyze({ data: { userAnswers: payload } });
      }
    };

    Promise.all([
      runAnalyze(),
      calculateBudget(
        bundle.screening.relationship,
        bundle.screening.occasion,
      ),
    ])
      .then(([r, b]) => {
        if (cancelled) return;
        const sanitized: DeepSeekResult = {
          psychological_profile: enforcePronouns(r.psychological_profile, pronouns),
          recommended_gift: enforcePronouns(r.recommended_gift, pronouns),
          motivation: enforcePronouns(r.motivation, pronouns),
          search_query: r.search_query,
        };
        setResult(sanitized);
        setBudget(b);

        try {
          if (typeof window !== "undefined" && sanitized.recommended_gift) {
            const next = [...previousGifts, sanitized.recommended_gift].slice(-2);
            window.localStorage.setItem(LAST_GIFTS_KEY, JSON.stringify(next));
          }
        } catch { /* noop */ }

        const linkUs = buildAmazonLink("US", sanitized.recommended_gift, b);
        const linkUk = buildAmazonLink("UK", sanitized.recommended_gift, b);
        backup({
          data: {
            screening: bundle.screening,
            tags: bundle.tags,
            journey: bundle.journey,
            recommendation: {
              recommended_gift: sanitized.recommended_gift,
              psychological_profile: sanitized.psychological_profile,
              motivation: sanitized.motivation,
            },
            product_link_us: linkUs,
            product_link_uk: linkUk,
          },
        }).then(
          (res) => console.info("[mini] backup:", res),
          (e) => console.warn("[mini] backup error:", e),
        );
      })
      .catch((e: unknown) => {
        console.warn("[mini] analyze failed:", e);
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [bundle, analyze, backup]);

  if (loading) {
    return (
      <section className="editorial-fade text-center">
        <p className={`${eyebrow} mb-6`}>Composing</p>
        <h2
          className="font-[var(--font-display)] font-bold leading-[1.1] tracking-tight text-[var(--editorial-ink)]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
        >
          <Typewriter text="A quiet moment while we listen to your answers." />
        </h2>
      </section>
    );
  }

  if (failed || !result) {
    return (
      <section className="editorial-fade text-center">
        <button
          type="button"
          onClick={onReset}
          className="text-[0.85rem] uppercase tracking-[0.24em] font-semibold text-[var(--secondary)] hover:text-[color:#08574c] transition-colors underline underline-offset-4"
        >
          {RETAKE_LABEL}
        </button>
      </section>
    );
  }

  const labelBase =
    "uppercase font-bold text-[0.85rem] tracking-[0.3em] mb-1.5";
  const bodyText =
    "font-sans font-normal text-[1.1rem] leading-[1.5] text-[var(--editorial-ink)]";

  return (
    <section className="editorial-fade">
      {/* 1. Psychological Profile */}
      <FadeIn delay={60}>
        <section className="mb-4">
          <p className={`${labelBase} text-[var(--secondary)]`}>Psychological Profile</p>
          <p className={bodyText}>{result.psychological_profile}</p>
        </section>
      </FadeIn>

      {/* 2. Recommended Gift — focal, gold-accented */}
      <FadeIn delay={160}>
        <section className="mb-4">
          <p className={`${labelBase} text-[var(--accent-gold-deep)]`}>Recommended Gift</p>
          <div className="rounded-[6px] border border-[var(--accent-gold)] bg-white px-5 py-4 shadow-[0_2px_18px_-10px_rgba(212,175,55,0.35)]">
            <h2
              className="font-[var(--font-display)] font-bold leading-[1.15] tracking-tight text-[var(--editorial-ink)]"
              style={{ fontSize: "clamp(1.9rem, 4.2vw, 2.75rem)" }}
            >
              <Typewriter text={result.recommended_gift} speedMs={28} />
            </h2>
          </div>
        </section>
      </FadeIn>

      {/* 3. Motivation */}
      <FadeIn delay={260}>
        <section className="mb-4">
          <p className={`${labelBase} text-[var(--secondary)]`}>Motivation</p>
          <p className={bodyText}>{result.motivation}</p>
        </section>
      </FadeIn>

      {/* 4. Amazon buttons */}
      {budget && (
        <FadeIn delay={360}>
          <div className="grid gap-3 sm:grid-cols-2 max-w-2xl mb-4">
            {(["US", "UK"] as AmazonRegion[]).map((r) => (
              <a
                key={r}
                href={buildAmazonLink(r, result.recommended_gift, budget)}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveRegion(r)}
                onFocus={() => setActiveRegion(r)}
                className="btn-primary-gold group"
              >
                <span>
                  {r === "US" ? "Find it on Amazon US" : "Find it on Amazon UK"}
                </span>
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </FadeIn>
      )}

      {/* 5. Social share */}
      {budget && (
        <FadeIn delay={410}>
          <ShareRow
            shareUrl={buildAmazonLink(activeRegion, result.recommended_gift, budget)}
          />
        </FadeIn>
      )}

      <FadeIn delay={460}>
        <div className="mt-2 text-center">
          <button
            type="button"
            onClick={onReset}
            className="text-[0.8rem] uppercase tracking-[0.24em] font-semibold text-[var(--secondary)] hover:text-[color:#08574c] transition-colors underline underline-offset-4"
          >
            {RETAKE_LABEL}
          </button>
        </div>
      </FadeIn>
    </section>
  );
}

// ---------- share row ----------
function ShareRow({ shareUrl }: { shareUrl: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="mt-1 mb-5 flex justify-center">
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="inline-flex items-center gap-2 rounded-[4px] border-2 border-[var(--primary)] bg-white px-5 py-2.5 text-[0.8rem] uppercase tracking-[0.18em] font-semibold text-[var(--primary)] transition-colors duration-200 hover:bg-[var(--primary)] hover:text-white"
      >
        {copied ? <Check size={16} strokeWidth={2} /> : <LinkIcon size={16} strokeWidth={1.75} />}
        <span>{copied ? "Copied" : "Copy link"}</span>
      </button>
    </div>
  );
}

