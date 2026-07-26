import { createFileRoute } from "@tanstack/react-router";
import { SurveyProvider, useSurvey } from "@/contexts/SurveyProvider";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz — MindGift" },
      {
        name: "description",
        content:
          "Dry-run of the MindGift survey navigation: eligibility-filtered macro areas, tag collection, and the I DON'T KNOW terminate-and-switch flow.",
      },
      { property: "og:title", content: "Quiz — MindGift" },
      {
        property: "og:description",
        content:
          "Personality-driven gift discovery. Answer a few questions to reveal a single, perfectly matched suggestion.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/quiz" },
    ],
    links: [{ rel: "canonical", href: "/quiz" }],
  }),
  component: QuizRoute,
});

function QuizRoute() {
  return (
    <SurveyProvider profile={{ ageGroup: "age-adult", relationship: "partner" }}>
      <QuizScreen />
    </SurveyProvider>
  );
}

function QuizScreen() {
  const {
    currentMA,
    currentLevel,
    currentLevelIndex,
    collectedTags,
    answer,
    dontKnow,
    resetSurvey,
    isComplete,
    state,
  } = useSurvey();

  return (
    <main className="mx-auto max-w-3xl px-6 py-24 space-y-16">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          MindGift · Dry-run
        </p>
        <h1 className="text-4xl font-light tracking-tight">Quiz</h1>
      </header>

      {isComplete ? (
        <section className="space-y-6">
          <p className="text-2xl font-light">Survey complete.</p>
          <button
            type="button"
            onClick={resetSurvey}
            className="text-sm underline underline-offset-4"
          >
            Restart
          </button>
        </section>
      ) : currentMA && currentLevel ? (
        <section className="space-y-12">
          <div className="space-y-2">
            <p
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              data-testid="ma-id"
            >
              {currentMA.id} · Level {currentLevelIndex + 1} of {currentMA.levels.length}
            </p>
            <h2 className="text-2xl font-light text-[#0B7060]" data-testid="ma-title">
              {currentMA.title}
            </h2>
            <p className="text-lg text-foreground/80" data-testid="level-question">
              {currentLevel.question}
            </p>
          </div>

          <ul className="space-y-4">
            {currentLevel.options.map((opt) => (
              <li key={opt.id}>
                <button
                  type="button"
                  onClick={() => answer(opt.id)}
                  data-testid={`option-${opt.id}`}
                  className="w-full text-left border-b border-border/60 pb-4 hover:border-foreground transition-colors"
                >
                  <span className="block text-base">{opt.label}</span>
                  <span className="block text-xs text-muted-foreground mt-1">
                    tag: {opt.tag}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="pt-8 border-t border-border/40">
            <button
              type="button"
              onClick={dontKnow}
              data-testid="idk-button"
              className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
            >
              I don't know
            </button>
          </div>
        </section>
      ) : (
        <p className="text-muted-foreground">Loading…</p>
      )}

      <aside
        className="mt-24 border-t border-border/40 pt-8 space-y-3 text-xs font-mono text-muted-foreground"
        data-testid="debug-panel"
      >
        <p className="uppercase tracking-[0.2em]">Debug</p>
        <p data-testid="debug-current">currentMA: {state.currentMA ?? "null"}</p>
        <p data-testid="debug-terminated">
          terminatedMAs: [{state.terminatedMAs.join(", ")}]
        </p>
        <p data-testid="debug-completed">
          completedMAs: [{state.completedMAs.join(", ")}]
        </p>
        <p data-testid="debug-tag-count">
          collectedTags: {collectedTags.length}
        </p>
        <pre
          data-testid="debug-tags-json"
          className="max-h-64 overflow-auto bg-muted/40 p-3 rounded"
        >
          {JSON.stringify(collectedTags, null, 2)}
        </pre>
      </aside>
    </main>
  );
}
